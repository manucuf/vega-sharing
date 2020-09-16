import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { pick } from 'lodash';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>) {}

  private static async passwordMatches(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  private static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(name: string, lastname: string, password: string, email: string): Promise<User | undefined> {
    const hashedPassword = await UserService.hash(password);
    const createdUser = new this.userModel({
      name,
      lastname,
      hashedPassword,
      email
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email });
  }

  async findUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    const retrievedUser = await this.userModel.findOne({ email : email });

    if (retrievedUser && (await UserService.passwordMatches(retrievedUser, password))) {
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

  async getUsersFromSubstring(substring: string): Promise<Pick<User, "_id" | "name" | "lastname" | "email">[] | undefined> {
    const retrievedUsers = await this.userModel.find({
        $or: [{name: {"$regex": substring, "$options": "i"}}, {lastname: {"$regex": substring, "$options": "i"}}, {email: {"$regex": substring, "$options": "i"}}]
      }
    ).limit(20);

    if (retrievedUsers) {
      return retrievedUsers.map(u => pick(u, ['_id', 'name', 'lastname', 'email']));
    } else {
      return undefined;
    }
  }
}
