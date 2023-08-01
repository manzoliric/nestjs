import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UniqueEmail } from '../validator/unique-email';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsEmail()
  @UniqueEmail({ message: 'Email $value already exists' })
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password: string;
}
