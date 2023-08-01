import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<UserEntity> {
    const newUser = {
      id: uuid(),
      ...user,
    };

    return this.userRepository.create(newUser);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userRepository.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userRepository.delete(id);
  }
}
