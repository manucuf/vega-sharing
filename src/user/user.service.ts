import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserPayloadResponse, UserPayload } from '../types';
import * as bcrypt from 'bcrypt'
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly authenticationService: AuthenticationService
  ) {}

  async create(userPayload: UserPayload): Promise<User> {
    userPayload.password = await bcrypt.hash(userPayload.password, 10);
    const createdUser = new this.userModel(userPayload);
    return createdUser.save();
  }

  async findOne(email: string, password: string): Promise<UserPayloadResponse | object> {
    const retrievedUser = await this.userModel.findOne({ email : email });
    if (!retrievedUser) return {
      "status" : 404,
      "error" : "user not found"
    };

    const validatedUser = await this.authenticationService.validate(password, retrievedUser.password);
    if (!validatedUser) return {
      "status" : 401,
      "error" : "wrong password"
    };

    return {
      email : retrievedUser.email,
      name : retrievedUser.name,
      lastname : retrievedUser.lastname
    };

  }

}
