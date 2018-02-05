import { Controller, Route } from '../../../src';
import { ParentController } from './ParentController';

@Controller({
  prefix: '/child',
  parent: ParentController,
})
export class ChildController {
  @Route.GET('/method')
  childRoute() {
    return 'child';
  }
}
