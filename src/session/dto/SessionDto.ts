import {IsNotEmpty} from 'class-validator';

export class SessionDto {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  creatorId: string;
  @IsNotEmpty()
  roomId: string;
}

