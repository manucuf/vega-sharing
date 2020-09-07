import { InternalServerErrorException, BadRequestException, Controller, Body, Post } from '@nestjs/common';
import { SessionDto } from './dto/SessionDto';
import { SessionService } from './session.service';
import { SessionError } from './SessionError';
import {Session} from './schema/session.schema'

@Controller('session')
export class SessionController { //gestisci non esistenza di user e room, collegamento db chisa se funziona

    constructor(private readonly sessionService: SessionService) {}

    @Post('create')
    async create(@Body() body: SessionDto): Promise<Session> {
        try {
            const createdSession = await this.sessionService.create(body.name, body.description, body.creatorId/*, body.roomId*/); //SISTEMA CON I CAMPI
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
}
