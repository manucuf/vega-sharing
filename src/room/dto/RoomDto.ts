import {IsNotEmpty} from 'class-validator';
export class RoomDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  userIds: string[];

  @IsNotEmpty()
  creatorId: string;
}
