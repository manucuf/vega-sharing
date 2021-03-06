import { Injectable } from '@nestjs/common';
import { Session } from './schema/session.schema';
import { SessionError, ErrorType } from './SessionError';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson'
import { UserService } from '../user/user.service';
import { pick } from 'lodash';
import { RoomService } from '../room/room.service';

@Injectable()
export class SessionService {

    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
        private readonly userService: UserService,
        private readonly roomService: RoomService) {}

    async create(name: string, description: string, creatorId: string, roomId: string): Promise<Session> {
        const user = await this.userService.findById(creatorId);
        if(!user) {
            throw new SessionError('Creator Id not found', ErrorType.INVALID_USER);
        }
        const room = await this.roomService.findById(roomId);
        if(!room) {
            throw new SessionError('Room Id not found', ErrorType.INVALID_ROOM);
        }
        const userRooms = await this.roomService.getRoomsByUserId(creatorId);
        const result = await this.roomService.checkRoomInRooms(roomId, userRooms);
        if(result == true) {
          const createdSession = new this.sessionModel( {
              name,
              description,
              creator : new ObjectId(creatorId),
              room: new ObjectId(roomId)
          });
          return createdSession.save();
        } else {
          throw new SessionError("Declared creatorId is not in the room with roomId", ErrorType.USER_NOT_IN_THE_ROOM);
        }
            
    }

    
    async getSessionsByRoomId(id: string) : Promise<Pick<Session, "_id" | "name" | "description" | "creator" | "room">[] | undefined> {
        const retrievedSessions = await this.sessionModel.find({room : new ObjectId(id)}).populate({
          path: 'creator',
          model: 'User',
        }).lean();
        if(retrievedSessions) {
          return retrievedSessions.map((session) => ({
            ...session,
            creator: pick(session.creator, ['_id', 'name', 'lastname', 'email'])
          }));
        } else {
          return undefined;
        }
    }

    async getSessionsByCreatorId(id: string) : Promise< Session[]> {
      const retrievedSessions = await this.sessionModel.find({creator: new ObjectId(id)});
      console.log(retrievedSessions);
      return retrievedSessions;
    }
}
