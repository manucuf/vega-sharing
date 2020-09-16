import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthenticationService} from './authentication.service';
import { pick } from 'lodash';
import { AuthenticationError } from './AuthenticationError';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserPayloadResponseDto } from './dto/UserPayloadResponseDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { UserTokenDto } from './dto/UserTokenDto';
import { UserPayloadDto } from './dto/UserPayloadDto';

@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginPayload: LoginPayloadDto): Promise<UserPayloadResponseDto | undefined> {
    try {

      const { user, token } = await this.authService.login(loginPayload.email, loginPayload.password);
      return {
        token,
        user: pick(user, ['email', 'name', 'lastname', '_id']),
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
  async refresh(@Body() refreshToken: RefreshTokenDto): Promise<UserTokenDto | undefined> {
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
  async register(@Body() body: UserPayloadDto): Promise<UserPayloadResponseDto | undefined> {
    try {
      const { user, token } = await this.authService.register(body.name, body.lastname, body.password, body.email);
      return {
        token,
        user: pick(user, ['email', 'name', 'lastname', '_id'])
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

}
