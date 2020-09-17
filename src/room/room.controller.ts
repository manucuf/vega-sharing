import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Post,
  Query, Req, UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/RoomDto';
import { Room } from './schema/room.schema';
import { RoomError } from './RoomError';
import {JwtAuthGuard} from '../authentication/jwt-auth.guard';


@Controller('rooms')
export class RoomController {

  constructor(private readonly roomService: RoomService) {}

  /**
   * POST /rooms/create
   * Allows the user to create a new room passing as body: name, description, user ids and creator id.
   * Returns the Room data.
   * Returns an error if the creator id is not existing.
   * A valid access token in Authorization header is required, otherwise it returns an unauthorized error
   * @param body
   * @return Promise<Room>
   */
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: RoomDto): Promise<Room> {
    try {
      return await this.roomService.create(body.name, body.description, body.userIds, body.creatorId);
    } catch (exception) {
      if (exception instanceof RoomError) {
        throw new BadRequestException({
            message: exception.message,
            type: exception.type
        })
    } else {
        throw new InternalServerErrorException("Errore sconosciuto");
    }
    }
  }

  /**
   * GET /rooms?userId=ex4mp1e
   * It allows the user to get all the rooms in which he is involved, passing his Id as parameter.
   * It returns an array of Rooms or an empty array if the user isn't in any Room.
   * It's required a valid access token, otherwise an unauthorized error is returned.
   * @param res
   * @param params
   */
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getRoomsByUserId(@Req() res, @Query() params): Promise< Pick<Room, "_id" | "name" | "description" | "creator" | "users">[]> {
    try {
      return await this.roomService.getRoomsByUserId(params.userId);
    } catch (ex) {
      throw new NotFoundException();
    }
  }

}
