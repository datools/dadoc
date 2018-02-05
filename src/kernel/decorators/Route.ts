import { IController, IHttpRoute } from './../';

// tslint:disable-next-line
export const Route: IHttpRoute = (
  methods: string | string[],
  path: string,
  options?: any,
): (...args: any[]) => any => {
  return (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const target: IController = prototype.constructor;
    if (!target.$routes) target.$routes = [];
    target.$routes.push({
      handler: propertyKey,
      methods,
      options,
      path,
    });
  };
};

Route.GET = (path: string, options?: any) => Route('GET', path, options);
Route.POST = (path: string, options?: any) => Route('POST', path, options);
Route.PUT = (path: string, options?: any) => Route('PUT', path, options);
Route.PATCH = (path: string, options?: any) => Route('PATCH', path, options);
Route.DELETE = (path: string, options?: any) => Route('DELETE', path, options);

Route.HEAD = (path: string, options?: any) => Route('HEAD', path, options);
Route.OPTIONS = (path: string, options?: any) => Route('OPTIONS', path, options);
