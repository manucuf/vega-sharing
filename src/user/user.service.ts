import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserPayload } from '../types';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>) {}

  async create(userPayload: UserPayload): Promise<User> {
    userPayload.password = await bcrypt.hash(userPayload.password, 10);
    const createdUser = new this.userModel(userPayload);
    return createdUser.save();
  }

  async passwordMatches(user, password): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async findUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    const retrievedUser = await this.userModel.findOne({ email : email });

    if (retrievedUser && (await this.passwordMatches(retrievedUser, password))) {
      return retrievedUser;
    } else {
      return undefined;
    }
  }

  async findById(id: string): Promise<User | undefined> {
    const retrievedUser = await this.userModel.findById(id);
    if (retrievedUser) {
      return retrievedUser;
    } else {
      return undefined;
    }
  }
}
