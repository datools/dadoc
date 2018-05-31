import { logger } from './../kernel/Logger';
import { PermissionNotDefinedError } from './errors/PermissionNotDefined';
import { RoleNotFoundError } from './errors/RoleNotFound';

const log = logger.get();

function includesOr(array: string[], ...args: string[]): boolean {
  for (const arg of args) if (array.indexOf(arg) >= 0) return true;
  return false;
}

export class Acl {
  private permissions: { [name: string]: string[] };

  constructor() {
    this.setConf();
  }

  public setConf(permissions?: { [name: string]: string[] }): void {
    this.permissions = permissions || {
      public: ['anonymous', 'authenticated'],
      private: ['authenticated'], // tslint:disable-line
      admin: ['admin'],
    };
  }

  public check(
    roles: string | string[],
    permissions: string | string[],
    throwError: boolean = true,
  ): boolean {
    const userRoles: string[] = Array.isArray(roles) ? roles : [roles];
    const neededPermissions: string[] = Array.isArray(permissions)
      ? permissions
      : [permissions];

    for (const perm of neededPermissions) {
      if (perm && typeof perm === 'string') {
        let permRoles: string | string[] = this.permissions[perm];

        if (permRoles) {
          if (!Array.isArray(permRoles)) permRoles = [permRoles];

          if (!includesOr(permRoles, ...userRoles)) {
            log(
              `ACL fail for permissions "${neededPermissions}" with roles "${userRoles}"`,
            );
            if (throwError) throw new RoleNotFoundError(perm);
            return false;
          }
        } else {
          log(
            `ACL fail for permissions "${neededPermissions}" with roles "${userRoles}"`,
          );
          if (throwError) throw new PermissionNotDefinedError(perm);
          return false;
        }
      }
    }
    return true;
  }
}
