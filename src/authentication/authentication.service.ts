import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import { UserService } from '../user/user.service';
import { IJwtPayload, IRefreshToken, UserToken } from '../types';
import { RefreshToken } from '../schemas/refreshToken.schema';

import * as crypto from 'crypto';
import * as moment from 'moment';
import { AuthenticationError, ErrorType } from './AuthenticationError';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>)  {}

  async login(email: string, password: string): Promise<{user: User, token: UserToken} | undefined> {
    const user = await this.userService.findUserByEmailAndPassword(email, password);
    if (user) return {
      user,
      token: await this.createToken(user)
    };
    else {
      throw new AuthenticationError('User not found', ErrorType.NOT_FOUND);
    }
  }


  private async createToken(user: User): Promise<UserToken> {
    const jwtPayload: IJwtPayload = {
      id: user.id
    };
    return {
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: (await this.generateRefreshToken(user)).token,
      expiresIn: moment().add(/*this.configService.getJwtExpirationMinutes() * 60 */ 300, 'minutes').toDate(),
      tokenType: 'Bearer',
    };
  }

  public async refreshAccessToken(dto: IRefreshToken): Promise<UserToken> {

    const result = await this.refreshTokenModel.findOne({
      token: dto.token
      //userId: new ObjectId(dto.userId),
    });

    if (!result) {
      throw new UnauthorizedException('RefreshToken not found');
    } else if (result.expires < new Date()) {
      throw new UnauthorizedException('RefreshToken expired');
    }

    const user = await this.userService.findById(result.userId);
    if (!user) {
      throw new NotFoundException();
    }
    await this.refreshTokenModel.deleteOne(result);
    return this.createToken(user);
  }

  private async generateRefreshToken(user: User): Promise<IRefreshToken> {
    const userId = user.id;

    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(/* this.configService.getRefreshTokenExpirationDays()*/ 120, 'days').toDate();
    const createdRefreshToken = new this.refreshTokenModel({
      userId,
      email: user.email,
      token,
      expires,
    });
    return createdRefreshToken.save();
  }

}
