import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  completed: boolean;
}
