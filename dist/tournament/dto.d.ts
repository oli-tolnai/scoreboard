export declare class CreateTeamDto {
    name: string;
}
export declare class CreateTaskDto {
    name: string;
    maxPoints: number;
}
export declare class UpdateScoreDto {
    teamId: string;
    taskId: string;
    score: number;
}
export declare class ChangeViewDto {
    view: 'logo' | 'table' | 'scoreboard';
}
