import { InternalServerErrorException, NotFoundException, BadRequestException, Controller, Body, Post, Get, Param } from '@nestjs/common';
import { SessionDto } from './dto/SessionDto';
import { SessionService } from './session.service';
import { SessionError } from './SessionError';
import {Session} from './schema/session.schema';

@Controller('session')
export class SessionController { 

    constructor(private readonly sessionService: SessionService) {}

    @Post('create')
    async create(@Body() body: SessionDto): Promise<Session> {
        try {
            const createdSession = await this.sessionService.create(body.name, body.description, body.creatorId, body.roomId);
            return createdSession;
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

    @Get(':id')
    async getSessionsByRoomId(@Param('id') id): Promise< Pick<Session, "_id" | "name" | "description" | "creator" | "room">[] | undefined> {
        try {
            return await this.sessionService.getSessionsByRoomId(id);
        } catch (ex) {
            throw new NotFoundException();
        }
    }

}
