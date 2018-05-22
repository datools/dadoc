/* tslint:disable */
import * as assert from 'assert';
import { RoleNotFoundError, PermissionNotDefinedError } from '../src';

describe('ACL', function() {
  const userRoles = ['anonymous'];

  it('grant if needed', function() {
    const result = this.acl.check(userRoles, ['public']);
    assert.strictEqual(result, true);
  });

  it('refuse if needed', function() {
    assert.throws(() => {
      this.acl.check(userRoles, ['private']);
    }, RoleNotFoundError);
  });

  it('refuse if permission is not defined', function() {
    assert.throws(() => {
      this.acl.check(userRoles, ['not defined']);
    }, PermissionNotDefinedError);
  });
});
