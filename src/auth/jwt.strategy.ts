import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config()
import { UserService } from 'src/user/user.service';
console.log("SECRET", process.env.SECRET);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(process.env.SECRET, "secret$can$Not$be%empty12"),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneByUsername(payload.username);
    console.log({user, payload});
    
    return user ? { userId: user.id, username: user.username } : null;
  }
}
