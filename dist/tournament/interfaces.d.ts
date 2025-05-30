export interface Team {
    id: string;
    name: string;
    scores: {
        [taskId: string]: number;
    };
    totalScore: number;
}
export interface Task {
    id: string;
    name: string;
    maxPoints: number;
}
export interface TournamentState {
    teams: Team[];
    tasks: Task[];
    currentView: 'logo' | 'table' | 'scoreboard';
    isAnimating: boolean;
}
