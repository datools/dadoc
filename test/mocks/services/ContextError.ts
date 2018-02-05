import { Inject } from '@datools/di';
import { Request } from '../../../src';

@Inject()
export class ContextErrorService {
  constructor(private request: Request) {
    console.log(request);
  }

  foo() {
    return 'request';
  }
}
