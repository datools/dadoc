import { HttpError } from '../HttpErrors';

export class NotFoundError extends HttpError {
  constructor(public payload?: any) {
    super('Not found', 404, payload);
  }
}
