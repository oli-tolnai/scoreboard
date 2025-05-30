import { Injectable } from '@nestjs/common';
import { Team, Task, TournamentState } from './interfaces';
import { CreateTeamDto, CreateTaskDto, UpdateScoreDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TournamentService {
  private state: TournamentState = {
    teams: [],
    tasks: [],
    currentView: 'logo',
    isAnimating: false,
  };

  getState(): TournamentState {
    return this.state;
  }

  addTeam(createTeamDto: CreateTeamDto): Team {
    const team: Team = {
      id: uuidv4(),
      name: createTeamDto.name,
      scores: {},
      totalScore: 0,
    };

    this.state.teams.push(team);
    return team;
  }

  addTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      name: createTaskDto.name,
      maxPoints: createTaskDto.maxPoints,
    };

    this.state.tasks.push(task);
    
    // Initialize scores for existing teams
    this.state.teams.forEach(team => {
      team.scores[task.id] = 0;
    });

    return task;
  }

  updateScore(updateScoreDto: UpdateScoreDto): void {
    const team = this.state.teams.find(t => t.id === updateScoreDto.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const task = this.state.tasks.find(t => t.id === updateScoreDto.taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    team.scores[updateScoreDto.taskId] = updateScoreDto.score;
    this.calculateTotalScore(team);
  }

  private calculateTotalScore(team: Team): void {
    team.totalScore = Object.values(team.scores).reduce((sum, score) => sum + score, 0);
  }

  changeView(view: 'logo' | 'table' | 'scoreboard'): void {
    this.state.currentView = view;
  }

  getTeamsSortedByScore(): Team[] {
    return [...this.state.teams].sort((a, b) => b.totalScore - a.totalScore);
  }

  deleteTeam(teamId: string): void {
    this.state.teams = this.state.teams.filter(team => team.id !== teamId);
  }

  deleteTask(taskId: string): void {
    this.state.tasks = this.state.tasks.filter(task => task.id !== taskId);
    // Remove scores for this task from all teams
    this.state.teams.forEach(team => {
      delete team.scores[taskId];
      this.calculateTotalScore(team);
    });
  }

  setAnimating(isAnimating: boolean): void {
    this.state.isAnimating = isAnimating;
  }
}
