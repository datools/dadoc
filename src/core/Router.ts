import * as findMyWay from 'find-my-way';
import { logger } from './../kernel/Logger';
import { RouteData } from './RouteData';

const log = logger.get();

export class Router {
  private instance: any;

  constructor() {
    this.instance = findMyWay();
  }

  public add(
    methods: string | string[],
    path: string,
    handler: (...args) => any,
    payload?: any,
  ): Router {
    log(`[Route] "${methods} ${path}"`);
    if (!/^(\/|\*)/.test(path)) path = `/${path}`;
    this.instance.on(methods, path, handler, payload);
    return this;
  }

  public find(method: string, path: string): RouteData {
    const match: any = this.instance.find(method, path);
    if (match) {
      return {
        handler: match.handler,
        method,
        options: match.store,
        params: match.params,
        path,
      };
    }
  }
}
