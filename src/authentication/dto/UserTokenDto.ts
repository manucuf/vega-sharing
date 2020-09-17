import { IToken } from '../interface/IToken';

export class UserTokenDto implements IToken {
  accessToken: string;
  expiresIn: Date;
  refreshToken: string;
  tokenType: string;
}