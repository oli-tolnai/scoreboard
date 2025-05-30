import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;
}

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  maxPoints: number;
}

export class UpdateScoreDto {
  @IsString()
  teamId: string;

  @IsString()
  taskId: string;

  @IsNumber()
  @Min(0)
  score: number;
}

export class ChangeViewDto {
  @IsString()
  view: 'logo' | 'table' | 'scoreboard';
}
