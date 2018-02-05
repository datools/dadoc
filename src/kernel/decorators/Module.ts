import { IModule, IModuleOptions } from '../index';

// tslint:disable-next-line
export function Module(options?: IModuleOptions): Function {
  return (target: IModule) => {
    target.$module = options;
  };
}
