import { Inject } from '@datools/di';
import { SharedService } from '../services/SharedService';
import { Controller, Route, Request, Response } from '../../../src';
import { RequestService } from '../services/RequestService';

@Controller({
  prefix: '/services',
})
@Inject()
export class ServicesController {
  constructor(private shared: SharedService, private req: RequestService) {}

  @Route.GET('/shared')
  sharedRoute() {
    return this.shared.foo();
  }

  @Route.GET('/request')
  requestRoute() {
    return this.req.foo();
  }
}
