import { IController, IControllerOptions } from '../index';

// tslint:disable-next-line
export function Controller(options: IControllerOptions = {}): Function {
  return (target: IController): void => {
    if (!options.prefix) options.prefix = '';
    target.$options = options;
  };
}
