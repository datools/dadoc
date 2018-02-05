import * as debug from 'debug';
import * as findMyWay from 'find-my-way';
import { RouteData } from './RouteData';

const log = debug('@dadoc/core:router');

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
    this.instance.on(methods, path, handler, payload);
    log(`[Route] "${methods} ${path}"`);
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
