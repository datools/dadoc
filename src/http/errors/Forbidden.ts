import { HttpError } from '../HttpErrors';

export class ForbiddenError extends HttpError {
  constructor(public payload?: any) {
    super('Forbidden', 403, payload);
  }
}
