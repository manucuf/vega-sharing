import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(props) {
    super(props);

  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    return true;
  }

  handleRequest(err, user, info: any = {}) {
    if (err || !user) {
      throw err || new UnauthorizedException(info.message || undefined);
    }
    return user;
  }
}


