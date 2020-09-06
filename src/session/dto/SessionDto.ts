import {SafeUser} from '../../types';
import { RoomDto } from '../../room/dto/RoomDto';

export class SessionDto {
  name: string;
  description: string;
  creator: SafeUser;
  room: RoomDto
}