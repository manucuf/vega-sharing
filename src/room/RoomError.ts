export enum ErrorType {
    INVALID_USER,
  }
  export class RoomError extends Error {
    public type: ErrorType;
  
    constructor(message, type: ErrorType) {
      super(message);
      this.type = type;
    }
  }