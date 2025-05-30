"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let TournamentService = class TournamentService {
    constructor() {
        this.state = {
            teams: [],
            tasks: [],
            currentView: 'logo',
            isAnimating: false,
        };
    }
    getState() {
        return this.state;
    }
    addTeam(createTeamDto) {
        const team = {
            id: (0, uuid_1.v4)(),
            name: createTeamDto.name,
            scores: {},
            totalScore: 0,
        };
        this.state.teams.push(team);
        return team;
    }
    addTask(createTaskDto) {
        const task = {
            id: (0, uuid_1.v4)(),
            name: createTaskDto.name,
            maxPoints: createTaskDto.maxPoints,
        };
        this.state.tasks.push(task);
        this.state.teams.forEach(team => {
            team.scores[task.id] = 0;
        });
        return task;
    }
    updateScore(updateScoreDto) {
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
    calculateTotalScore(team) {
        team.totalScore = Object.values(team.scores).reduce((sum, score) => sum + score, 0);
    }
    changeView(view) {
        this.state.currentView = view;
    }
    getTeamsSortedByScore() {
        return [...this.state.teams].sort((a, b) => b.totalScore - a.totalScore);
    }
    deleteTeam(teamId) {
        this.state.teams = this.state.teams.filter(team => team.id !== teamId);
    }
    deleteTask(taskId) {
        this.state.tasks = this.state.tasks.filter(task => task.id !== taskId);
        this.state.teams.forEach(team => {
            delete team.scores[taskId];
            this.calculateTotalScore(team);
        });
    }
    setAnimating(isAnimating) {
        this.state.isAnimating = isAnimating;
    }
};
exports.TournamentService = TournamentService;
exports.TournamentService = TournamentService = __decorate([
    (0, common_1.Injectable)()
], TournamentService);
//# sourceMappingURL=tournament.service.js.map