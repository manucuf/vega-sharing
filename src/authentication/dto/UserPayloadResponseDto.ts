import { SafeUserDto } from './SafeUserDto';
import { UserTokenDto } from './UserTokenDto';

export class UserPayloadResponseDto {
  user: SafeUserDto;
  token: UserTokenDto;
}