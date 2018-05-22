import * as debug from 'debug';

export const logger = {
  stack: {},
  get() {
    const ns = `@datools/dadoc`;
    if (!this.stack[ns]) {
      this.stack[ns] = debug(ns);
    }
    return this.stack[ns];
  },
};
