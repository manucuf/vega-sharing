import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

<<<<<<< HEAD:src/authentication/dto/UserPayloadDto.ts
=======
export class LoginPayloadDto {
  email: string;
  password: string;
}

export class SignupPayloadDto {
  email: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
}


export class UserPayloadResponseDto {
  user: SafeUser;
  token: UserToken;
}

>>>>>>> master:src/authentication/dto/AuthenticationDto.ts
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
