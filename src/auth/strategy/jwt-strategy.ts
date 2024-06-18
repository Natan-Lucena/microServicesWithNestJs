import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { UserRepositoryService } from 'src/providers/repositories/user-repository/user-repository.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepositoryService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userRepository.findUserByEmail(payload.email);
    if (!user.active) {
      throw new ForbiddenException('User is not active');
    }
    delete user.password;

    return user;
  }
}
