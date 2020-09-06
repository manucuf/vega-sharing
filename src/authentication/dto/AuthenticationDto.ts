
import {SafeUser, UserToken} from '../../types'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginPayloadDto {
  email: string;
  password: string;
}


export class UserPayloadResponseDto {
  user: SafeUser;
  token: UserToken;
}

export class UserPayloadDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;
  @MinLength(8)
  password: string;
  @IsEmail()
  email: string;
}