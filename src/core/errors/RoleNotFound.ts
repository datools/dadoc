export class RoleNotFoundError extends Error {
  constructor(permission: string) {
    super(`Valid role not found for permission "${permission}"`);
  }
}
