import { IServiceProvider } from '@datools/di';

export interface IModuleOptions {
  modules?: any[];
  providers?: any[] | IServiceProvider[];
  controllers?: any[];
  listeners?: any[];
}
