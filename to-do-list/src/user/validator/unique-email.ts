import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    const userExists = await this.userRepository.emailExists(email);
    return !userExists;
  }
}

export const UniqueEmail = (options: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
