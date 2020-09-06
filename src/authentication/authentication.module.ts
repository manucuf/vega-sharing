import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken, RefreshTokenSchema } from 'src/authentication/schema/refreshToken.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule,
            JwtModule.registerAsync({
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => {
                return {
                  secret: configService.get<string>('JWT_SECRET'),
                  signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION')}
                }
              }
            }),
         /*   JwtModule.register({
              secret: "parolasegreta",
              signOptions: { expiresIn: '60s' },
            }),*/
            MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
           ],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
