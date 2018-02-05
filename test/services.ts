/* tslint:disable */
import * as assert from 'assert';

describe('Services / Listeners', () => {
  it('resolve global providers', function() {
    return this.request
      .get('/services/shared')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'shared');
      });
  });

  it('resolve request service', function() {
    return this.request
      .get('/services/request')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'request');
      });
  });

  it('call resolvers on route', function() {
    return this.request
      .post('/reqres/resolvers')
      .send({})
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          beforeResolve: true,
          afterResolve: true,
        });
      });
  });

  it('call listeners', function() {
    return this.request
      .get('/reqres/hookable')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          hooked: true,
        });
      });
  });
});
