import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schema/room.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';

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

}
