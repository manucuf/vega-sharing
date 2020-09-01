import { Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthenticationService {
  constructor(
    //private jwtService: JwtService
  ) {}

  async validate(password: string, hashedPassword: string): Promise<any> {
    return await bcrypt.compare(password, hashedPassword);
  }


  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}