import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production',
      envFilePath: ['.env.development.local'],
      isGlobal: true,

    }),
    UserModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: function (configService: ConfigService) {
        return {
          uri: configService.get<string>('DATABASE_URI')
        }
      }
    }),
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
