import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthCreditDto } from './dto/auth-credit.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/user')
  @UseGuards(AuthGuard())
  test(
    @GetUser() user: User,
  ): { statusCode: string; message: string; user: object } {
    console.log('check log');
    const { id, username } = user;
    return {
      statusCode: 'success',
      message: 'auth test',
      user: { id, username },
    };
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCreditDto: AuthCreditDto): Promise<object> {
    return this.authService.signUp(authCreditDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCreditDto: AuthCreditDto): Promise<object> {
    return this.authService.signIn(authCreditDto);
  }
}
