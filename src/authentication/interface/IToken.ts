export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  tokenType: string;
}