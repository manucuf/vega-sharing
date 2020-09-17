import { IRefreshToken } from '../interface/IRefreshToken';

export class RefreshTokenDto implements IRefreshToken {
  email: string;
  expires: Date;
  token: string;
  userId: string;
}