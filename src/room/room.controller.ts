import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/RoomDto';
import { Room } from './schema/room.schema';

@Controller('room')
export class RoomController {

  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() body: RoomDto): Promise<Room> {
    try {
      return await this.roomService.create(body.name, body.description, body.userIds, body.creatorId);
    } catch (ex) {
      throw new InternalServerErrorException();
    }
  }

}
