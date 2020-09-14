 import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthenticationService} from './authentication.service';
import { IRefreshToken, UserToken } from '../types';
import { pick } from 'lodash';
 import { LoginPayloadDto, UserPayloadResponseDto, UserPayloadDto } from './dto/AuthenticationDto';
 import { AuthenticationError } from './AuthenticationError';

@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginPayload: LoginPayloadDto): Promise<UserPayloadResponseDto | undefined> {
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
    try {
      return await this.authService.refreshAccessToken(refreshToken);
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

  @Post('register')
  async register(@Body() body: UserPayloadDto) {
    try {
      const registeredUser = await this.authService.register(body);
      return {
        token: await this.authService.createToken(registeredUser),
        user: pick(registeredUser, ['email', 'name', 'lastname', 'id']),
      }
    } catch (exception) {
      if (exception instanceof AuthenticationError) {
        throw new BadRequestException({
          message: [exception.message],
          type: exception.type
        })
      } else {
        throw new InternalServerErrorException("Errore sconosciuto");
      }
    }
  }

}
