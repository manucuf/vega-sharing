
export enum ErrorType {
  NOT_FOUND,
  INVALID_CREDENTIALS,
  UNKNOWN,
  REFRESH_TOKEN_NOT_FOUND,
  REFRESH_TOKEN_EXPIRED,
  EMAIL_ALREADY_TAKEN,
}
export class AuthenticationError extends Error {
  public type: ErrorType;

  constructor(message, type: ErrorType) {
    super(message);
    this.type = type;
  }
}
