export interface IHttpServer {
  use(fn: (...args: any[]) => any, path?: string): IHttpServer;
  listen(port: number, hostname?: string): Promise<void>;
  getInstance(): any;
}
