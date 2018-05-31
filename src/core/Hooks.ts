import { logger } from './../kernel/Logger';

const log = logger.get();

export class Hooks {
  private hooks: { [name: string]: any[] };

  constructor() {
    this.hooks = {};
  }

  public on(
    name: string,
    callback: (...args) => any,
    weight: number = 0,
  ): Hooks {
    if (typeof callback !== 'function')
      throw new Error('Callback is not a function');

    if (!this.hooks[name]) this.hooks[name] = [];

    this.hooks[name].push({
      callback,
      name,
      weight,
    });

    this.hooks[name].sort((a, b) => a.weight - b.weight);
    log(`[Hook] For "${name}" added`);
    return this;
  }

  public async invoke(name: string, ...args: any[]) {
    if (!this.hooks[name]) this.hooks[name] = [];
    for (const hook of this.hooks[name]) {
      await hook.callback(...args);
    }
  }
}
