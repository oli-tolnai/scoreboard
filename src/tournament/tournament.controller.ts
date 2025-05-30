import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentGateway } from './tournament.gateway';
import { CreateTeamDto, CreateTaskDto, UpdateScoreDto, ChangeViewDto } from './dto';

@Controller('api/tournament')
export class TournamentController {
  constructor(
    private readonly tournamentService: TournamentService,
    private readonly tournamentGateway: TournamentGateway,
  ) {}

  @Get('state')
  getState() {
    return this.tournamentService.getState();
  }

  @Post('teams')
  addTeam(@Body() createTeamDto: CreateTeamDto) {
    const team = this.tournamentService.addTeam(createTeamDto);
    this.tournamentGateway.broadcastStateUpdate();
    return team;
  }

  @Delete('teams/:id')
  deleteTeam(@Param('id') id: string) {
    this.tournamentService.deleteTeam(id);
    this.tournamentGateway.broadcastStateUpdate();
    return { success: true };
  }

  @Post('tasks')
  addTask(@Body() createTaskDto: CreateTaskDto) {
    const task = this.tournamentService.addTask(createTaskDto);
    this.tournamentGateway.broadcastStateUpdate();
    return task;
  }

  @Delete('tasks/:id')
  deleteTask(@Param('id') id: string) {
    this.tournamentService.deleteTask(id);
    this.tournamentGateway.broadcastStateUpdate();
    return { success: true };
  }

  @Put('scores')
  updateScore(@Body() updateScoreDto: UpdateScoreDto) {
    this.tournamentService.updateScore(updateScoreDto);
    this.tournamentGateway.broadcastStateUpdate();
    return { success: true };
  }

  @Put('view')
  changeView(@Body() changeViewDto: ChangeViewDto) {
    this.tournamentService.changeView(changeViewDto.view);
    this.tournamentGateway.broadcastViewChange(changeViewDto.view);
    return { success: true };
  }

  @Post('animate-scoreboard')
  animateScoreboard() {
    this.tournamentGateway.triggerScoreboardAnimation();
    return { success: true };
  }
}
