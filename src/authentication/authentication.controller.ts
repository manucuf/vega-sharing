import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService, IToken } from './authentication.service';
import { User } from '../schemas/user.schema';
import { LoginPayload } from '../types';

export class AuthResponse {
  token: IToken;
  user: Pick<User, 'id' | 'name' | 'email' >;
}

@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  //async login(@Body() loginPayload: LoginPayload): Promise<AuthResponse> {
  async login(@Body() loginPayload: LoginPayload): Promise<User | undefined> {
    return await this.authService.login(loginPayload.email, loginPayload.password);
  }

  // @Post('refresh-token')
  // async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<UserToken> {
  //   return await this.authService.refreshAccessToken(refreshTokenDto);
  // }
}
