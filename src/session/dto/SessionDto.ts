import {SafeUser} from '../../types';
import { RoomDto } from '../../room/dto/RoomDto';
import {IsNotEmpty} from 'class-validator';


export class SessionDto {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  creatorId: string; //Safeuser //string
  @IsNotEmpty()
  roomId: string; //room dto
}

//cambiato il dto: non c'era modo di risalire all'id della room da room dto
