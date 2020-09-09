import { Body, Controller, Get, InternalServerErrorException, BadRequestException, NotFoundException, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/RoomDto';
import { Room } from './schema/room.schema';
import { RoomError } from './RoomError';


@Controller('room')
export class RoomController {

  constructor(private readonly roomService: RoomService) {}

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

  @Get(':id')
  async getRoomsByUserId(@Param('id') id): Promise< Pick<Room, "_id" | "name" | "description" | "creator" | "users">[]> {
    try {
      return await this.roomService.getRoomsByUserId(id);
    } catch (ex) {
      throw new NotFoundException();
    }
  }

}
