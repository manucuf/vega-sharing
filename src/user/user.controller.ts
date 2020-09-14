import { Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { User } from './schema/user.schema';

@Controller('users')


export class UserController {

  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsersFromSubstring(@Req() res, @Query() params): Promise< Pick<User, "_id" | "email" | "name" | "lastname">[] | undefined> {
      try {
        return await this.userService.getUsersFromSubstring(params.q);
      } catch (ex) {
        throw new NotFoundException();
      }
    }

}
