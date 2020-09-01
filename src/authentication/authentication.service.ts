import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {

  constructor(private readonly userService: UserService) {}

  public async login(email: string, password: string) {

    // fai cose di login
    // ...
    const user = await this.userService.findUserByEmail(email);
    console.log(user);
    if (user) {
      console.log("utente trovato");
      return user;
    } else {
      console.log("utente non trovato");
      return false;
    }
  }
}
