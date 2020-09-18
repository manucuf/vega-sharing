import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { SessionDto } from './dto/SessionDto';
import { SessionService } from './session.service';
import { SessionError } from './SessionError';
import { Session } from './schema/session.schema';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Controller('sessions')
export class SessionController { 

    constructor(private readonly sessionService: SessionService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() body: SessionDto): Promise<Session> {
        try {
            return await this.sessionService.create(body.name, body.description, body.creatorId, body.roomId);
        } catch (exception) {
            if (exception instanceof SessionError) {
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
    @Get('room')
    async getSessionsByRoomId(@Req() res, @Query() params): Promise< Pick<Session, "_id" | "name" | "description" | "creator" | "room">[] | undefined> {
        try {
            return await this.sessionService.getSessionsByRoomId(params.roomId);
        } catch (ex) {
            throw new NotFoundException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('creator')
    async getSessionsByCreatorId(@Req() res, @Query() params): Promise<Session[]> {
      try {
        return await this.sessionService.getSessionsByCreatorId(params.creatorId);
      } catch (ex) {
        throw new NotFoundException();
      }
    }

    

    
}
