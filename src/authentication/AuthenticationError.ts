
export enum ErrorType {
  NOT_FOUND,
  INVALID_CREDENTIALS,
  UNKNOWN,
  REFRESH_TOKEN_NOT_FOUND,
}
export class AuthenticationError extends Error {
  public type: ErrorType;

  constructor(message, type: ErrorType) {
    super(message);
    this.type = type;
  }
}
