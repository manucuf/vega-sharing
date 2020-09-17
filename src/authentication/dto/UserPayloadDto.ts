import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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
