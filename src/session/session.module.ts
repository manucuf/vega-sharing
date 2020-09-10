import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schema/session.schema';
import { UserModule } from '../user/user.module';
import { RoomModule } from 'src/room/room.module';


@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [UserModule,
            RoomModule,
            MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])]
})
export class SessionModule {}
