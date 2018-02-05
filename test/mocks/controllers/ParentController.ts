import { Controller, Route } from '../../../src';

@Controller({
  prefix: '/parent',
})
export class ParentController {
  @Route.GET('/')
  parentRoute() {
    return 'parent';
  }
}
