import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/room.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { pick } from 'lodash';
import { UserService } from '../user/user.service';
import { RoomError, ErrorType } from './RoomError';


@Injectable()
export class RoomService {

  constructor(@InjectModel(Room.name) private roomModel: Model<Room>,
    private readonly userService: UserService) {}

  async create(name: string, description: string, userIds: string[], creatorId: string): Promise<Room> {
    const user = await this.userService.findById(creatorId);
    if(!user) {
      throw new RoomError('Creator Id not found', ErrorType.INVALID_USER);
    }
    const createdRoom = new this.roomModel({
      name,
      description,
      users: userIds,
      creator : new ObjectId(creatorId)
    });
    return createdRoom.save();
  }

  async getRoomsByUserId(id: string) : Promise< Pick<Room, "_id" | "name" | "description" | "creator" | "users">[] | undefined> {
    const retrievedRooms = await this.roomModel.find({ $or: [{users : id}, {creator: new ObjectId(id)}]}).populate({
      path: 'users',
      model: 'User'
    }).lean();
    
    if(retrievedRooms) {
      return retrievedRooms.map((room) => ({
        ...room,
        users: room.users.map(u => pick(u, ['_id', 'name', 'lastname', 'email']))
      }));
    } else {
      return undefined;
    }
  }

  async findById(id: string): Promise<Room | undefined> {
    const retrievedRoom = await this.roomModel.findById(id);
    if (retrievedRoom) {
      return retrievedRoom;
    } else {
      return undefined;
    }
  }

  async checkRoomInRooms(roomId: string, rooms: Pick<Room, "_id" | "name" | "description" | "creator" | "users">[]): Promise<boolean> {
    /*let result = false;
    rooms.forEach( (room) => {
      if(String(room._id) == roomId) {
        result = true;
        return;
      }
    });
    return result;*/

    
    return Object.keys(rooms).some(function(k) {return rooms[k]._id == roomId;}); 
    //------------------------------------ATTENZIONE ATTENZIONE--------------------------------------------------
    //------------------------------------ATTENZIONE ATTENZIONE--------------------------------------------------
    //Dario, verifica che questa funzione faccia ESATTAMENTE la stessa cosa che fa il codice commentato di sopra
    //------------------------------------ATTENZIONE ATTENZIONE--------------------------------------------------
    //------------------------------------ATTENZIONE ATTENZIONE--------------------------------------------------
  }

}
