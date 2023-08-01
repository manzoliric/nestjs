import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UniqueEmail } from '../validator/unique-email';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @UniqueEmail({ message: 'Email $value already exists' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
