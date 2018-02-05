import { Request } from '../../../src';

export class RequestService {
  constructor(private request: Request) {}

  foo() {
    return 'request';
  }
}
