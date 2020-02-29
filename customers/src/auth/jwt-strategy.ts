import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ConfigService } from '../config/config.service';
const configService = new ConfigService(`${process.env.NODE_ENV || 'development'}.env`);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
