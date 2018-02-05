// Imports
import { ServerResponse } from 'http';
import { Writable } from 'stream';

/**
 * Response object
 * @class
 */
export class Response {
  public body: any;

  /**
   * @protected
   */
  constructor(public raw: ServerResponse) {}

  /**
   * Set/Get/Remove header to response
   * @method Response#header
   * @param {string} name - Header name (Content-Type)
   * @param {string} value - Header value (application/json)
   * @return {Response|string}
   */
  public header(name: string, value?: string | number | string[]) {
    if (value === undefined) return this.raw.getHeader(name);
    if (value === null) this.raw.removeHeader(name);
    else this.raw.setHeader(name, value);
    return this;
  }

  get status() {
    return this.raw.statusCode;
  }

  set status(value: number) {
    this.raw.statusCode = value;
  }

  get message() {
    return this.raw.statusMessage;
  }

  set message(value: string) {
    this.raw.statusMessage = value;
  }

  public redirect(url: string, status: number = 301) {
    this.raw.writeHead(status, {
      Location: url,
    });
    this.raw.end();
  }

  public enableStream() {
    if (!this.raw.headersSent) this.header('content-type', 'text/event-stream');
    return this;
  }

  public write(chunk: any, encoding: string = 'utf-8') {
    this.raw.write(chunk, encoding);
    return this;
  }

  public end(chunk?: any, encoding: string = 'utf-8') {
    this.raw.end(chunk, encoding);
    return this;
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
