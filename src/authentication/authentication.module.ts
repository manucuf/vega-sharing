import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken, RefreshTokenSchema } from 'src/authentication/schema/refreshToken.schema';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule,
            JwtModule.registerAsync({
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => {
                return {
                  secret: configService.get<string>('JWT_SECRET'),
                  signOptions: { expiresIn: parseInt(configService.get<string>('JWT_EXPIRATION')) * 60 }
                }
              }
            }),
         /*   JwtModule.register({
              secret: "parolasegreta",
              signOptions: { expiresIn: '60s' },
            }),*/
            MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
          PassportModule.register({ defaultStrategy: 'jwt', session: false}),
           ],
  providers: [AuthenticationService, JwtStrategy],
  exports: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
