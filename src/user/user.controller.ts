import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPayloadDto } from './dto/UserPayloadDto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

}
