import { Inject } from '@datools/di';
import { IResolver, Request } from '../../../src';

@Inject()
export class BeforeResolver implements IResolver {
  constructor(private req: Request) {}

  async resolve() {
    this.req.body.beforeResolve = true;
  }
}
