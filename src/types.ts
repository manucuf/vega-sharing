import { User } from './schemas/user.schema';

type SafeUser = Pick<User, "email" | 'id' | 'name' | 'lastname'>

export type UserPayload = {
  name: string;
  lastname: string;
  password: string;
  email: string;
}

export type UserToken = {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  tokenType: string;
}

export type UserPayloadResponse = {
  user: SafeUser,
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
