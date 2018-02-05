import * as connect from 'connect';
import http from 'http';
import { IHttpServer } from './IHttpServer';

export class ConnectServer implements IHttpServer {
  private instance: connect.Server;

  constructor() {
    this.instance = connect();
  }

  public use(fn: (...args: any[]) => any, path?: string): ConnectServer {
    if (path) {
      this.instance.use(path, fn as connect.HandleFunction);
    } else {
      this.instance.use(fn as connect.HandleFunction);
    }
    return this;
  }

  public listen(port: number, hostname?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.listen(port, hostname, () => {
        resolve();
      });
    });
  }

  public getInstance(): connect.Server {
    return this.instance;
  }
}
