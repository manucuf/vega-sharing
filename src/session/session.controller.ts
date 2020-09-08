import { InternalServerErrorException, NotFoundException, BadRequestException, Controller, Body, Post, Get, Param } from '@nestjs/common';
import { SessionDto } from './dto/SessionDto';
import { SessionService } from './session.service';
import { SessionError } from './SessionError';
import {Session} from './schema/session.schema'
import { ServerHttp2Session } from 'http2';

@Controller('session')
export class SessionController { //gestisci non esistenza di user e room, collegamento db chisa se funziona

    constructor(private readonly sessionService: SessionService) {}

    @Post('create')
    async create(@Body() body: SessionDto): Promise<Session> {
        try {
            const createdSession = await this.sessionService.create(body.name, body.description, body.creatorId, body.roomId); //SISTEMA CON I CAMPI
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
    async getRoomsByUserId(@Param('id') id): Promise< Pick<Session, "_id" | "name" | "description" | "creatorId" | "roomId">[] | undefined> {
        try {
            return await this.sessionService.getSessionsByRoomId(id);
        } catch (ex) {
            throw new NotFoundException();
        }
    }

}
