/* tslint:disable */
import * as assert from 'assert';

describe('Requests / Responses / Errors', () => {
  it('parse JSON body', function() {
    return this.request
      .post('/reqres/json')
      .send({
        foo: 'bar',
        bar: 'baz',
      })
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          foo: 'bar',
          bar: 'baz',
        });
      });
  });

  it('parse URL encoded body', function() {
    return this.request
      .post('/reqres/url-encoded')
      .send('foo=bar')
      .send('bar=baz')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          foo: 'bar',
          bar: 'baz',
        });
      });
  });

  it('parse query parameters', function() {
    return this.request
      .get('/reqres/query')
      .query({
        foo: 'bar',
        nested: {
          bar: 'baz',
        },
      })
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          foo: 'bar',
          nested: {
            bar: 'baz',
          },
        });
      });
  });

  it('return string', function() {
    return this.request
      .get('/reqres/string')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'string response');
      });
  });

  it('return string with arguments on route', function() {
    return this.request
      .get('/reqres/arg')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'string response with arg');
      });
  });

  it('can access to parent route', function() {
    return this.request
      .get('/parent')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'parent');
      });
  });

  it('return string on deep route', function() {
    return this.request
      .get('/parent/child/method')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'child');
      });
  });

  it('return object', function() {
    return this.request
      .get('/reqres/object')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, {
          foo: 'bar',
        });
      });
  });

  it('return custom response', function() {
    return this.request
      .get('/reqres/custom-response')
      .expect(202)
      .then(response => {
        assert.equal(response.text, '<strong>foo</strong>');
        assert.equal(response.type, 'text/html');
      });
  });

  it('catch http error', function() {
    return this.request
      .get('/errors/http')
      .expect(403)
      .then(response => {
        assert.deepEqual(response.body, {
          error: {
            status: 403,
            message: 'Forbidden',
          },
        });
      });
  });

  it('catch normal error', function() {
    return this.request
      .get('/errors/common')
      .expect(500)
      .then(response => {
        assert.deepEqual(response.body, {
          error: {
            status: 500,
            message: 'Simple error',
          },
        });
      });
  });

  it('catch unknown error', function() {
    return this.request
      .get('/errors/unknown')
      .expect(500)
      .then(response => {
        assert.deepEqual(response.body, {
          error: {
            status: 500,
            message: 'Unknown error',
            payload: 'String error',
          },
        });
      });
  });

  it('redirect if url have a trailing slash', function() {
    return this.request.get('/parent/child/method/').expect(301);
  });
});
