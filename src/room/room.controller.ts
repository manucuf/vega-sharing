import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Param,
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
