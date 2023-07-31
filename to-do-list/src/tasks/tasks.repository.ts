import { Injectable } from '@nestjs/common';
import { TasksEntity } from './tasks.entity';
import { ListTaskDTO } from './dto/listTask';

@Injectable()
export default class TasksRepository {
  private tasks: TasksEntity[] = [];

  createTask(task: TasksEntity) {
    this.tasks.push(task);

    return task;
  }

  listTasks() {
    const savedTasks = this.tasks;
    const listTasks = savedTasks.map(
      (task) => new ListTaskDTO(task.id, task.name, task.completed),
    );

    return listTasks;
  }

  updateTask(id: string, task: Partial<TasksEntity>) {
    const updatedTask = this._searchTaskById(id);

    Object.entries(task).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      updatedTask[key] = value;
    });

    return updatedTask;
  }

  deleteTask(id: string) {
    const taskToDelete = this._searchTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
  }

  _searchTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }
}
