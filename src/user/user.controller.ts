import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPayloadDto } from './dto/UserPayloadDto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() body: UserPayloadDto) {
    return this.userService.create(body)
  }

}
