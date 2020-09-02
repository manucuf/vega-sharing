import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPayload } from '../types';
import { LoginPayloadDto } from '../authentication/dto/LoginPayloadDto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() body: UserPayload) {
    return this.userService.create(body)
  }

}
