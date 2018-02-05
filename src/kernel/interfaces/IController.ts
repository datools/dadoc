import { IControllerOptions, IControllerRoute } from '../index';

export interface IController {
  $options: IControllerOptions;
  $routes?: IControllerRoute[];
  $resolvers?: {
    '*': any[];
    [method: string]: any[];
  };
}
