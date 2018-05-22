import { Container } from '@datools/di';
import { Hooks, RouteData } from '../../core';
import { App, IResolverOptions, ModulesManager } from '../../index';
import { logger } from './../Logger';

const log = logger.get();

export class ListenersManager {
  private modulesManager: ModulesManager;
  private resolversCache: {
    [prop: string]: any[];
  } = {};

  constructor(private app: App, private container: Container) {
    this.modulesManager = this.app.getModulesManager();
  }

  public attachListeners() {
    const hooks: Hooks = this.container.get(Hooks);
    for (const listener of this.modulesManager.getListeners()) {
      log(`[Listener] ${(listener as any).name}`);

      const listenerInstance = this.container.get(listener);
      if (listener.$hooks) {
        for (const hookName in listener.$hooks) {
          if (Array.isArray(listener.$hooks[hookName])) {
            for (const hookOptions of listener.$hooks[hookName]) {
              const callback: (...args: any[]) => any = listenerInstance[hookOptions.method].bind(
                listenerInstance,
              );
              hooks.on(hookName, callback, hookOptions.weight);
            }
          }
        }
      }
    }
  }

  public async executeResolvers(route: RouteData, after: boolean = false) {
    const { method, path, options } = route;
    const { controller, listeners } = options;

    let resolverStack: IResolverOptions[] = [];

    if (this.resolversCache[`${method}|${path}`]) {
      resolverStack = this.resolversCache[`${method}|${path}`];
    } else if (controller.class.$resolvers) {
      if (controller.class.$resolvers['*'].length) {
        resolverStack = [...controller.class.$resolvers['*']];
      }

      if (controller.class.$resolvers[controller.method]) {
        resolverStack = [...resolverStack, ...controller.class.$resolvers[controller.method]];
      }

      resolverStack.sort((a, b) => a.weight - b.weight);

      // Runtime cache
      this.resolversCache[`${method}|${path}`] = resolverStack;
    }

    if (resolverStack.length) {
      for (const resolver of resolverStack) {
        if (resolver.after === after || (!resolver.after && !after))
          await this.container.get(resolver.class).resolve(...resolver.args);
      }
    }
  }
}
