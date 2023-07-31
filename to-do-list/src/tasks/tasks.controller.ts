import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import TasksRepository from './tasks.repository';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TasksEntity } from './tasks.entity';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDTO } from './dto/updateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksRepository: TasksRepository) {}

  @Post()
  createTask(@Body() task: CreateTaskDTO) {
    const tasksEntity = new TasksEntity();

    tasksEntity.id = uuid();
    tasksEntity.name = task.name;
    tasksEntity.completed = task.completed;

    this.tasksRepository.createTask(tasksEntity);

    return {
      id: tasksEntity.id,
      ...task,
    };
  }

  @Get()
  listTasks() {
    return this.tasksRepository.listTasks();
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDTO) {
    const updatedTask = this.tasksRepository.updateTask(id, task);
    return updatedTask;
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksRepository.deleteTask(id);

    return {
      message: 'Task deleted successfully',
    };
  }
}
