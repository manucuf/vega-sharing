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

  /**
   * POST authentication/login
   * It allows the user to access the reserved area by inserting email and password.
   * It returns User data and Token data.
   * If email or password are wrong, it returns an error.
   * @param loginPayload
   * @return Promise<UserPayloadResponseDto | undefined>
   */
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

  /**
   * POST authentication/refresh-token
   * It allows the user to refresh his access token, given his refresh token as input.
   * It is also created a new refresh token.
   * It returns some Token data: access token, expiring date, refresh token and token type.
   * It returns an error if the refresh token is not found, expired or if the associated user id is not found.
   * @param refreshToken
   * @return Promise<UserTokenDto | undefined>
   */
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

  /**
   * POST authentication/register
   * Creates a new user instance by providing his data: name, lastname, email and password.
   * Returns User data, which contains: id, email, name and lastname (password is removed due to security reasons)
   * and Token data, which contains: access token, expiring date, refresh token and token type.
   * Returns an error if password length is less than 8 characters, email format is not valid or email already exists.
   * @param body
   * @return Promise<UserPayloadResponseDto | undefined>
   */
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
          message: [exception.message],
          type: exception.type
        })
      } else {
        throw new InternalServerErrorException("Errore sconosciuto");
      }
    }
  }

}
