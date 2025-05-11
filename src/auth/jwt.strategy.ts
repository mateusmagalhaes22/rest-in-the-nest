import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '6e793be61c98f99a29b80a8d6c13440b7f0fa02885e4691de49093437626ed17',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.username };
  }
}