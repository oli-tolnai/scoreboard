import { TournamentService } from './tournament.service';
import { TournamentGateway } from './tournament.gateway';
import { CreateTeamDto, CreateTaskDto, UpdateScoreDto, ChangeViewDto } from './dto';
export declare class TournamentController {
    private readonly tournamentService;
    private readonly tournamentGateway;
    constructor(tournamentService: TournamentService, tournamentGateway: TournamentGateway);
    getState(): import("./interfaces").TournamentState;
    addTeam(createTeamDto: CreateTeamDto): import("./interfaces").Team;
    deleteTeam(id: string): {
        success: boolean;
    };
    addTask(createTaskDto: CreateTaskDto): import("./interfaces").Task;
    deleteTask(id: string): {
        success: boolean;
    };
    updateScore(updateScoreDto: UpdateScoreDto): {
        success: boolean;
    };
    changeView(changeViewDto: ChangeViewDto): {
        success: boolean;
    };
    animateScoreboard(): {
        success: boolean;
    };
}
