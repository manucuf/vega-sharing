import { Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { User } from './schema/user.schema';

@Controller('users')


export class UserController {

  constructor(private readonly userService: UserService) {}

  /**
   * GET /users?q=substring
   * It allows user, while trying to add users to his room, to search for other users by a substring containted in name, lastname or email.
   * It return an array of users or an empty array, if search is not successful.
   * Results number is limited to 20.
   * A valid access token in Authorization header is required, otherwise it returns an unauthorized error
   * @param res
   * @param params
   * @return Promise< Pick<User, "_id" | "email" | "name" | "lastname">[]
   */
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
