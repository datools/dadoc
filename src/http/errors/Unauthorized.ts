import { HttpError } from '../HttpErrors';

export class UnauthorizedError extends HttpError {
  constructor(public payload?: any) {
    super('Unauthorized', 401, payload);
  }
}
