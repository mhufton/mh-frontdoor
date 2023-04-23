import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // const user = await this.userService.findOne(payload.sub);
    // then spread the user object into the return object
    return { id: payload.sub, username: payload.username };
  }
}
