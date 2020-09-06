import {SafeUser} from '../../types';

export class RoomDto {
  name: string;
  description: string;
  users: SafeUser[];
  creator: SafeUser;
}