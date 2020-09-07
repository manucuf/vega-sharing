import { Injectable } from '@nestjs/common';
import { Session } from './schema/session.schema';
import { SessionDto } from './dto/SessionDto';
import { SessionError, ErrorType } from './SessionError';
import { Model } from 'mongoose';
import {User} from '../user/schema/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { SafeUser} from '../types';
import { ObjectId } from 'bson'
import { UserService } from '../user/user.service';

@Injectable()
export class SessionService {

    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
        private readonly userService: UserService) {}

    async create(name: string, description: string, creatorId: string/*, roomId: string*/): Promise<Session> {
        const user = await this.userService.findById(creatorId);
        if(!user) {
            throw new SessionError('Creator Id not found', ErrorType.INVALID_USER);
        }
        const createdSession = new this.sessionModel( {
            name,
            description,
            creatorId : new ObjectId(creatorId)/*,
            roomId: new ObjectId(roomId)*/
        });
        return createdSession.save();
            
    }



}
