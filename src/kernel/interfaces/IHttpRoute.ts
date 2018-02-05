export interface IHttpRoute {
  (methods: string | string[], path: string, options?: any): (...args: any[]) => any;
  GET?: (path: string, options?: any) => any;
  POST?: (path: string, options?: any) => any;
  PUT?: (path: string, options?: any) => any;
  PATCH?: (path: string, options?: any) => any;
  DELETE?: (path: string, options?: any) => any;

  HEAD?: (path: string, options?: any) => any;
  OPTIONS?: (path: string, options?: any) => any;
}
