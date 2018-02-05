export class HttpError extends Error {
  constructor(message: string, public status: number = 400, public payload?: any) {
    super(message);
  }
}
