import { Inject } from '@datools/di';
import { IResolver, Response } from '../../../src';

@Inject()
export class AfterResolver implements IResolver {
  constructor(private res: Response) {}

  async resolve() {
    this.res.body.afterResolve = true;
  }
}
