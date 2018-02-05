import { Route, ForbiddenError, Controller } from '../../../src';

@Controller({
  prefix: '/errors',
})
export class ErrorsController {
  @Route.GET('/http')
  httpError() {
    throw new ForbiddenError();
  }

  @Route.GET('/common')
  error() {
    throw new Error('Simple error');
  }

  @Route.GET('/unknown')
  unknownError() {
    throw 'String error';
  }
}
