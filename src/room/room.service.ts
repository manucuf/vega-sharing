import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/room.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { pick } from 'lodash';

@Injectable()
export class RoomService {

  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(name: string, description: string, userIds: string[], creatorId: string): Promise<Room> {

    const createdRoom = new this.roomModel({
      name,
      description,
      users: userIds,
      creator : new ObjectId(creatorId)
    });
    return createdRoom.save();
  }

  async getRoomsByUserId(id: string) : Promise< Pick<Room, "_id" | "name" | "description" | "creator" | "users">[] | undefined> {
    const retrievedRooms = await this.roomModel.find({users : id}).populate({
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

}
