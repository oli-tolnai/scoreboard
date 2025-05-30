import { Team, Task, TournamentState } from './interfaces';
import { CreateTeamDto, CreateTaskDto, UpdateScoreDto } from './dto';
export declare class TournamentService {
    private state;
    getState(): TournamentState;
    addTeam(createTeamDto: CreateTeamDto): Team;
    addTask(createTaskDto: CreateTaskDto): Task;
    updateScore(updateScoreDto: UpdateScoreDto): void;
    private calculateTotalScore;
    changeView(view: 'logo' | 'table' | 'scoreboard'): void;
    getTeamsSortedByScore(): Team[];
    deleteTeam(teamId: string): void;
    deleteTask(taskId: string): void;
    setAnimating(isAnimating: boolean): void;
}
