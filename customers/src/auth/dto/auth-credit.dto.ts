import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class AuthCreditDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
