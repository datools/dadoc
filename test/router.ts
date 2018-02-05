/* tslint:disable */
import * as assert from 'assert';

const handlerFunc = () => {};

describe('Router', function() {
  before(function() {
    this.coreRouter.add('GET', '/route/:var', handlerFunc, { foo: 'bar' });
  });

  it('return the route with data', async function() {
    const route = this.coreRouter.find('GET', '/route/abc');
    assert.deepEqual(route, {
      method: 'GET',
      path: '/route/abc',
      handler: handlerFunc,
      params: { var: 'abc' },
      options: { foo: 'bar' },
    });
  });
});
