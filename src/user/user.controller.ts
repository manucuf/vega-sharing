import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginPayload, UserPayload } from '../types';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() body: UserPayload) {
    return this.userService.create(body)
  }

  @Get()
  public login(@Body() body: LoginPayload) {
     const retrievedUser = this.userService.findOne(body.email);
     if (retrievedUser) return retrievedUser;
    // const validatedUser = validate(this.authenticationService.validate(retrievedUser);
    // return validatedUser;
  }

}
