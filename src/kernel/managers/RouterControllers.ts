import { Container } from '@datools/di';
import { IncomingMessage, ServerResponse } from 'http';
import * as urlJoin from 'url-join';
import { Hooks, jsonEncode, RouteData, Router } from '../../core';
import { HttpError, NotFoundError, Request, Response } from '../../http/index';
import { App, IResolverOptions } from '../../index';
import {
  IController,
  IControllerOptions,
  IControllerRoute,
  IRequestContext,
} from '../index';
import { logger } from './../Logger';
import { ListenersManager } from './ListenersManager';

const log = logger.get();

export class RouterControllers {
  private router: Router = new Router();
  private routes: IControllerRoute[] = [];

  constructor(private app: App) {}

  public add(controllerClass: IController) {
    log(`[Controller] ${(controllerClass as any).name}`);

    if (Array.isArray(controllerClass.$routes)) {
      // Build routes prefix with controllers prefixes
      let prefix: string = '';
      if (controllerClass.$options) {
        const opts: IControllerOptions = controllerClass.$options;
        if (opts.prefix) prefix = opts.prefix;
        if (opts.parent) {
          let parent: IController = opts.parent;
          while (parent) {
            if (parent.$options) {
              if (parent.$options.prefix)
                prefix = urlJoin(parent.$options.prefix, prefix);
              parent = parent.$options.parent;
            }
          }
        }
      }

      // Add route to routes stack
      for (const route of controllerClass.$routes) {
        this.addRoute(
          {
            handler: route.handler,
            methods: route.methods,
            options: route.options || {},
            path: urlJoin(prefix, route.path).replace(/\/$/, ''),
          },
          controllerClass,
        );
      }
    }
  }

  public addRoute(
    route: IControllerRoute,
    controller?: IController,
  ): RouterControllers {
    if (controller) {
      route.options.controller = {
        class: controller,
        method: route.handler,
      };
    }
    this.routes.push(route);
    return this;
  }

  public getRequestMiddleware(): (...args: any[]) => any {
    for (const routeOptions of this.routes) {
      const { methods, path, handler, options } = routeOptions;
      const { controller } = options;

      const callback: (...args: any[]) => any =
        typeof handler === 'string'
          ? controller.class.prototype[handler as string]
          : handler;

      this.router.add(methods, path, callback, options);
    }
    return this.executeRequest.bind(this);
  }

  private async executeRequest(req: IncomingMessage, res: ServerResponse) {
    const hooks: Hooks = new Hooks();
    const request: Request = new Request(req);
    const response: Response = new Response(res);

    // If trailing slash
    if (request.path !== '/' && /\/$/.test(request.path)) {
      // Do recirection without slash
      response.redirect(request.path.replace(/\/$/, ''));
      return;
    }

    const container: Container = new Container(this.app)
      .register({
        provide: Hooks,
        useValue: hooks,
      })
      .register({
        provide: Request,
        useValue: request,
      })
      .register({
        provide: Response,
        useValue: response,
      });

    const context: IRequestContext = {
      app: this.app,
      container,
    };

    await this.app.get(Hooks).invoke('app:request', context);

    try {
      const routeData: RouteData = this.router.find(
        request.method,
        request.path,
      );

      if (routeData) {
        context.route = routeData;
        await this.app.get(Hooks).invoke('app:route', context);

        container.register({
          provide: RouteData,
          useValue: routeData,
        });

        if (response.raw.finished) return;

        // Listeners
        const listenersManager: ListenersManager = new ListenersManager(
          this.app,
          container,
        );

        // Add listeners
        listenersManager.attachListeners();

        // Get data & options from route
        const { handler, params, options } = routeData;
        const { controller, listeners } = options;

        // Add params data to Request object
        request.params = params;
        response.status = 200;

        // Resolvers before
        await listenersManager.executeResolvers(routeData);

        // Instanciate controller
        const controllerIntance: any = container.get(controller.class);
        const callback: (...args: any[]) => any = handler.bind(
          controllerIntance,
        );

        // Call route callback
        const args: any[] = options.args || [];
        const result = await callback(...args);

        if (result) {
          response.body = result;
        }

        // Resolvers after
        await listenersManager.executeResolvers(routeData, true);

        // If ServerResponse not sent to client
        if (!response.raw.finished) {
          if (typeof response.body === 'string') {
            response.raw.end(response.body);
          } else {
            if (!response.raw.headersSent)
              response.raw.setHeader('Content-Type', 'application/json');
            response.raw.end(jsonEncode(response.body));
          }
        }
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      await this.handlerError(context, err);
    }
  }

  private async handlerError(context: IRequestContext, err: any) {
    const { container, app } = context;

    const req: IncomingMessage = container.get(Request).raw;
    const res: ServerResponse = container.get(Response).raw;

    // If error and response is not sent to client
    if (!res.finished) {
      context.error = err;

      await app.get(Hooks).invoke('app:error', context);

      const responseBody: any = {
        error: {
          message: 'Unknown error',
          status: 500,
        },
      };

      const { error } = context;

      if (error instanceof Error) {
        responseBody.error.message = error.message;

        if (error instanceof HttpError) {
          responseBody.error.status = (error as any).status;
          responseBody.error.payload = (error as any).payload;
        } else {
          // tslint:disable-next-line
          console.error(err);
        }

        // @TODO : configurable
        // if (error.stack) {
        //   responseBody.error.stack = error.stack;
        // }
      } else {
        responseBody.error.payload = err;
      }

      // Send error to client
      if (!res.headersSent) res.setHeader('Content-Type', 'application/json');

      res.statusCode = responseBody.error.status;
      res.statusMessage = responseBody.error.message;
      res.end(jsonEncode(responseBody));
    }
  }
}
