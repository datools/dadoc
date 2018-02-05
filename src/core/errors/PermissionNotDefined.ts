export class PermissionNotDefinedError extends Error {
  constructor(permission: string) {
    super(`Permission "${permission}" is not defined`);
  }
}
