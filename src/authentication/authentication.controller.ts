import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

type AuthenticationPayload = {
  email: string;
  password: string;
}

@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  public get() {
    return { msg: "ciao"}
  }

  @Post()
  public authenticate(@Body() body: AuthenticationPayload) {
     return this.authenticationService.login(body.email, body.password);
  }
}
