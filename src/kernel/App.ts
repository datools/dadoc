import { Container } from '@datools/di';
import * as bodyParser from 'body-parser';
import { IncomingMessage, ServerResponse } from 'http';
import { Hooks, RouteData, Router } from '../core';
import { ConnectServer, IHttpServer, Request, Response } from '../http';
import { ModulesManager, RouterControllers } from './managers';

export class App extends Container {
  private hooks: Hooks = new Hooks();
  private modulesManager: ModulesManager;
  private router: RouterControllers;

  constructor(private appModule: any, private server: IHttpServer = new ConnectServer()) {
    super();

    this.handleExit();

    this.register({
      provide: Request,
      useFactory: errorContextFactory(Request),
    })
      .register({
        provide: Response,
        useFactory: errorContextFactory(Response),
      })
      .register({
        provide: Hooks,
        useValue: this.hooks,
      })
      .register(
        {
          provide: App,
          useValue: this,
        },
        'app',
      );

    // Base middlewares
    this.server.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

    // Create modules manager
    this.modulesManager = new ModulesManager(appModule);

    // Add providers
    for (const service of this.modulesManager.getProviders()) {
      this.register(service);
    }

    // Instanciate services
    for (const service of this.modulesManager.getProviders()) {
      this.get(service.provide || service);
    }

    // Create router
    this.router = new RouterControllers(this);

    // Add controllers
    for (const controller of this.modulesManager.getControllers()) {
      this.router.add(controller);
    }
  }

  public use(...args: any[]): App {
    this.server.use.call(this.server, ...args);
    return this;
  }

  public hook(name: string, callback: (...args) => any, weight?: number): App {
    this.hooks.on(name, callback);
    return this;
  }

  public getServer(): IHttpServer {
    return this.server;
  }

  public getModulesManager(): ModulesManager {
    return this.modulesManager;
  }

  public async start(port: number, hostname?: string): Promise<any> {
    // Setup router middleware to server
    this.server.use(this.router.getRequestMiddleware());

    await this.hooks.invoke('app:start', {
      app: this,
    });
    return this.server.listen(port, hostname);
  }

  private handleExit() {
    const handler = (exitType: string = 'exit') => {
      return async () => {
        await this.hooks.invoke('app:exit', exitType);
        process.exit();
      };
    };

    // Handle exit / crash
    process.on('SIGINT', handler('SIGINT'));
    process.on('SIGTERM', handler('SIGTERM'));
  }
}

const errorContextFactory = dep => {
  return () => {
    throw new Error(`Cannot resolve ${dep.name || dep} in main container (invalid context)`);
  };
};
