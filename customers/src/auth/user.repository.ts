import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCreditDto } from './dto/auth-credit.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCreditDto: AuthCreditDto): Promise<object> {
    const { username, email, password } = authCreditDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // throw 409 error when duplicate username
        throw new ConflictException(
          `Username: ${username} or Email: ${email} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    return { statusCode: 201, message: 'signup success' };
  }

  async validateUserPassword(authCreditDto: AuthCreditDto): Promise<string> {
    const { username, password } = authCreditDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
