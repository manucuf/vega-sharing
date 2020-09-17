import { ISafeUser } from '../interface/ISafeUser';

export class SafeUserDto implements ISafeUser {
  _id: string;
  email: string;
  lastname: string;
  name: string;
}