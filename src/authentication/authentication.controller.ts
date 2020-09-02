 import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthenticationService} from './authentication.service';
import { User } from '../schemas/user.schema';
import {  UserPayloadResponse, IRefreshToken, UserToken } from '../types';
import { pick } from 'lodash';
 import { LoginPayloadDto } from './dto/LoginPayloadDto';
 import { AuthenticationError } from './AuthenticationError';


@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginPayload: LoginPayloadDto): Promise<UserPayloadResponse | undefined> {
    try {
      const { user, token } = await this.authService.login(loginPayload.email, loginPayload.password);
      return {
        token,
        user: pick(user, ['email', 'name', 'lastname', 'id']),
      }
    } catch (exception) {
      if (exception instanceof AuthenticationError) {
        throw new BadRequestException({
          message: exception.message,
          type: exception.type
        })
      } else {
        throw new InternalServerErrorException("Errore sconosciuto");
      }
    }
  }

  @Post('refresh-token')
  async refresh(@Body() refreshToken: IRefreshToken): Promise<UserToken> {
    return await this.authService.refreshAccessToken(refreshToken);
  }
}
