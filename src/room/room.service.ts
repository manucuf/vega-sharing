import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/room.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { pick } from 'lodash';

@Injectable()
export class RoomService {

  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(name: string, description: string, users: string[], creator: string): Promise<Room> {
    const createdRoom = new this.roomModel({
      name,
      description,
      users,
      creator : new ObjectId(creator)
    });
    return createdRoom.save();
  }

  async getRoomsByUserId(id: string) : Promise<Room[] | undefined> {
    const retrievedRooms = await this.roomModel.find({users : id}).populate({
      path: 'users',
      model: 'User'
    });
    if(retrievedRooms) {
      retrievedRooms.forEach( (room, i) => {
        retrievedRooms[i].users.forEach((user, j) => {
          retrievedRooms[i].users[j] = pick(user, ['id', 'name', 'lastname', 'email']);
        });
      })
      return retrievedRooms;
    } else {
      return undefined;
    }
  }

}
