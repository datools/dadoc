import { Inject } from '@datools/di';
import {
  Hooks,
  Controller,
  Route,
  Request,
  Response,
  Resolver,
  ResponseResolver,
} from '../../../src';
import { BeforeResolver } from '../listeners/BeforeResolver';
import { AfterResolver } from '../listeners/AfterResolver';

@Controller({
  prefix: '/reqres',
})
@Inject()
export class ReqResController {
  constructor(
    private req: Request,
    private res: Response,
    private hooks: Hooks,
  ) {}

  @Route.POST('/url-encoded')
  urlEncoded() {
    return this.req.body;
  }

  @Route.POST('/json')
  json() {
    return this.req.body;
  }

  @Route.GET('/query')
  query() {
    return this.req.query;
  }

  @Route.GET('/string')
  @Route.GET('/arg', { args: [' with arg'] })
  string(arg: string = '') {
    return `string response${arg}`;
  }

  @Route.GET('/object')
  object() {
    return {
      foo: 'bar',
    };
  }

  @Route.GET('/custom-response')
  customResponse() {
    this.res.status = 202;
    this.res.header('Content-Type', 'text/html');
    this.res.body = '<strong>foo</strong>';
  }

  @Route.POST('/resolvers')
  @Resolver({ class: BeforeResolver })
  @ResponseResolver({ class: AfterResolver })
  resolvers() {
    return this.req.body;
  }

  @Route.GET('/hookable')
  async hookable() {
    const data = {};
    await this.hooks.invoke('test.hook', data);
    return data;
  }
}
