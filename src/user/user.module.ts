import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthenticationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule, UserModule]
})

export class UserModule {}
