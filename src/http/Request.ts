import { IncomingHttpHeaders, IncomingMessage } from 'http';
import * as qs from 'qs';
import { Writable } from 'stream';
import { parse as parseUrl, Url } from 'url';

/**
 * Request object
 * @class
 */
export class Request {
  public path: string;
  public headers: IncomingHttpHeaders;
  public query: any;
  public params: any;
  public body: any;
  public urlData: Url;

  /**
   * @protected
   */
  constructor(public raw: IncomingMessage) {
    this.url = this.raw.url;
    this.headers = this.raw.headers;
    this.query = qs.parse(this.urlData.query);
    this.body = (this.raw as any).body;
  }

  get method(): string {
    return this.raw.method;
  }

  set method(value: string) {
    this.raw.method = value;
  }

  get url(): string {
    return this.raw.url;
  }

  set url(value: string) {
    this.urlData = parseUrl(value);
    this.path = this.urlData.pathname;
    this.raw.url = value;
  }

  public on(event: string, listener: (...args: any[]) => void) {
    this.raw.on(event, listener);
    return this;
  }

  public pipe(stream: Writable, options?: { end?: boolean }) {
    this.raw.pipe(stream, options);
    return this;
  }
}
