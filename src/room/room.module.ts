import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schema/room.schema';
import { UserModule } from '../user/user.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [UserModule,
        AuthenticationModule,
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
