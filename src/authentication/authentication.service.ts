import { Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import { UserService } from '../user/user.service';

export interface IToken {
  accessToken: string;
  refreshToken: string
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService
    //private jwtService: JwtService
  ) {}

  //async login(email: string, password: string): Promise<IToken | undefined> {
  async login(email: string, password: string): Promise<User | undefined> {
    //const user = await this.userService.findUserByEmailAndPassword(email, password);
    //return this.createToken(user);
    return await this.userService.findUserByEmailAndPassword(email, password);
  }


  // private async createToken(user: User): Promise<UserToken> {
  //   const jwtPayload: IJwtPayload = {
  //     role: user.role,
  //     id: user.id,
  //     sub: user.id,
  //   };
  //   return {
  //     accessToken: this.jwtService.sign(jwtPayload),
  //     refreshToken: (await this.generateRefreshToken(user)).token,
  //     expiresIn: moment()
  //       .add(this.configService.getJwtExpirationMinutes() * 60, 'minutes')
  //       .toDate(),
  //     tokenType: 'Bearer',
  //   };
  // }

  // public async refreshAccessToken(dto: RefreshTokenDto): Promise<UserToken> {
  //   const result = await this.refreshToken.findOne({
  //     token: dto.refreshToken,
  //     userId: new ObjectId(dto.userId),
  //   });
  //   if (!result) {
  //     throw new UnauthorizedException('RefreshToken not found');
  //   } else if (result.expires < new Date()) {
  //     throw new UnauthorizedException('RefreshToken expired');
  //   }
  //   const user = await this.usersService.findById(dto.userId);
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   const deleted = await this.refreshToken.deleteOne(result);
  //   return this.createToken(user);
  // }
  // private async generateRefreshToken(user: User): Promise<IRefreshToken> {
  //   const userId = user.id;
  //   const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
  //   const expires = moment()
  //     .add(this.configService.getRefreshTokenExpirationDays(), 'days')
  //     .toDate();
  //   const refreshToken = await this.refreshToken.create({
  //     userId,
  //     email: user.email,
  //     token,
  //     expires,
  //   });
  //   return refreshToken;
  // }


}