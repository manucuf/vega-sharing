import { User } from './schemas/user.schema';

export type SafeUser = Pick<User, "email" | 'id' | 'name' | 'lastname'>

export type UserToken = {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  tokenType: string;
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
