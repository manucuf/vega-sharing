import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { LoginPayload, UserPayload } from '../types';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userPayload: UserPayload): Promise<User> {
    const hash = await bcrypt.hash(userPayload.password, 10);
    userPayload.password = hash;
    const createdUser = new this.userModel(userPayload);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email : email });
  }

}
