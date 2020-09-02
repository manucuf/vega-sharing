export type UserPayload = {
  name: string;
  lastname: string;
  password: string;
  email: string;
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type UserToken = {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  tokenType: string;
}

export type UserPayloadResponse = {
  name: string;
  lastname: string;
  email: string;
  token: UserToken;
}



export interface IJwtPayload  {
  id: string;
}

export interface IRefreshToken {
    userId: string;
    email: string;
    token: string;
    expires: Date
}