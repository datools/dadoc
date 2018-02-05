import { Hook } from '../../../src';

export class TestListener {
  @Hook('test.hook')
  async hookData(data: any) {
    data.hooked = true;
  }
}
