import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'vegasharing',
    }),
    UserModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
