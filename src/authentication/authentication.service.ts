import { Injectable} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { RefreshToken } from './schema/refreshToken.schema';
import { IToken } from './interface/IToken';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { AuthenticationError, ErrorType } from './AuthenticationError';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from './interface/IJwtPayload';
import { IRefreshToken } from './interface/IRefreshToken';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>)  {}


  async register(name: string, lastname: string, password: string, email: string, username: string): Promise<{user: User, token: IToken} | undefined> {
    const foundUser = await this.userService.findByEmail(email);
    if(foundUser) {
      throw new AuthenticationError('User already existing', ErrorType.EMAIL_ALREADY_TAKEN); 
    } else {
      const createdUser = await this.userService.create(name, lastname, password, email, username );
      return {
        user: createdUser,
        token: await this.createToken(createdUser)
      }
    }
  }

  async login(email: string, password: string): Promise<{user: User, token: IToken} | undefined> {
    const user = await this.userService.findUserByEmailAndPassword(email, password);
    if (user) return {
      user,
      token: await this.createToken(user)
    };
    else {
      throw new AuthenticationError('Email or password not valid', ErrorType.NOT_FOUND);
    }
  }

  async createToken(user: User): Promise<IToken> {
    const jwtPayload: IJwtPayload = {
      id: user.id
    };
    //const jwtPayload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: (await this.generateRefreshToken(user)).token,
      expiresIn: moment().add(this.configService.get<string>('JWT_EXPIRATION'), 'minutes').toDate(),
      tokenType: 'Bearer',
    };
  }

  public async refreshAccessToken(refreshToken: IRefreshToken): Promise<IToken> {

    const result = await this.refreshTokenModel.findOne({
      token: refreshToken.token
      //userId: new ObjectId(dto.userId),
    });

    if (!result) {
      throw new AuthenticationError('RefreshToken not found', ErrorType.REFRESH_TOKEN_NOT_FOUND);
    } else if (result.expires < new Date()) {
      throw new AuthenticationError('RefreshToken expired', ErrorType.REFRESH_TOKEN_EXPIRED);
    }

    const user = await this.userService.findById(result.userId);
    if (!user) {
      throw new AuthenticationError('User not found', ErrorType.NOT_FOUND);
    }
    await this.refreshTokenModel.deleteOne(result);
    return this.createToken(user);
  }

  private async generateRefreshToken(user: User): Promise<IRefreshToken> {
    const userId = user.id;

    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(this.configService.get<string>('JWT_REFRESH_EXPIRATION'), 'days').toDate();
    const createdRefreshToken = new this.refreshTokenModel({
      userId,
      email: user.email,
      token,
      expires,
    });
    return createdRefreshToken.save();
  }

}
