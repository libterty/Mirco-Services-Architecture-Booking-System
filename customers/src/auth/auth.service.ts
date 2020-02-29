import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreditDto } from './dto/auth-credit.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCreditDto: AuthCreditDto): Promise<object> {
    return this.userRepository.signUp(authCreditDto);
  }

  async signIn(authCreditDto: AuthCreditDto): Promise<object> {
    console.log('check');
    const username = await this.userRepository.validateUserPassword(
      authCreditDto,
    );
    if (username === null) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return {
        statusCode: 200,
        success: 'authorized',
        message: 'signin success',
        accessToken,
      };
    }
  }
}
