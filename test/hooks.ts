/* tslint:disable */
import * as assert from 'assert';

describe('Hooks', function() {
  it('register hooks', function() {
    this.hooks.on('test:hook', async data => {
      data.hooked = 1;
      data.second = true;
    });

    this.hooks.on(
      'test:hook',
      async data => {
        data.hooked = 2;
        data.first = true;
      },
      -100,
    );

    assert.equal(this.hooks.hooks['test:hook'].length, 2);
  });

  it('throw an error if is not a function', function() {
    assert.throws(() => {
      this.hooks.register('test:hook', true);
    });
  });

  it('invoke hooks in right order', async function() {
    const data = { foo: 'bar' };
    await this.hooks.invoke('test:hook', data);

    assert.deepEqual(data, {
      foo: 'bar',
      hooked: 1,
      first: true,
      second: true,
    });
  });
});
