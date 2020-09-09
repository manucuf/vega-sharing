export enum ErrorType {
    INVALID_USER,
    INVALID_ROOM,
    USER_NOT_IN_THE_ROOM
  }
  export class SessionError extends Error {
    public type: ErrorType;
  
    constructor(message, type: ErrorType) {
      super(message);
      this.type = type;
    }
  }
  