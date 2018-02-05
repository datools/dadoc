import * as debug from 'debug';

export const logger = {
  stack: {},
  get(namespace: string) {
    const ns = `dadoc:${namespace}`;
    if (!this.stack[ns]) {
      this.stack[ns] = debug(ns);
    }
    return this.stack[ns];
  },
};
