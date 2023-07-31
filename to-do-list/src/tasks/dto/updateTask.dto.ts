import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
