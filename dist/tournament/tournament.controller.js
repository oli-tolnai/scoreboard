"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentController = void 0;
const common_1 = require("@nestjs/common");
const tournament_service_1 = require("./tournament.service");
const tournament_gateway_1 = require("./tournament.gateway");
const dto_1 = require("./dto");
let TournamentController = class TournamentController {
    constructor(tournamentService, tournamentGateway) {
        this.tournamentService = tournamentService;
        this.tournamentGateway = tournamentGateway;
    }
    getState() {
        return this.tournamentService.getState();
    }
    addTeam(createTeamDto) {
        const team = this.tournamentService.addTeam(createTeamDto);
        this.tournamentGateway.broadcastStateUpdate();
        return team;
    }
    deleteTeam(id) {
        this.tournamentService.deleteTeam(id);
        this.tournamentGateway.broadcastStateUpdate();
        return { success: true };
    }
    addTask(createTaskDto) {
        const task = this.tournamentService.addTask(createTaskDto);
        this.tournamentGateway.broadcastStateUpdate();
        return task;
    }
    deleteTask(id) {
        this.tournamentService.deleteTask(id);
        this.tournamentGateway.broadcastStateUpdate();
        return { success: true };
    }
    updateScore(updateScoreDto) {
        this.tournamentService.updateScore(updateScoreDto);
        this.tournamentGateway.broadcastStateUpdate();
        return { success: true };
    }
    changeView(changeViewDto) {
        this.tournamentService.changeView(changeViewDto.view);
        this.tournamentGateway.broadcastViewChange(changeViewDto.view);
        return { success: true };
    }
    animateScoreboard() {
        this.tournamentGateway.triggerScoreboardAnimation();
        return { success: true };
    }
};
exports.TournamentController = TournamentController;
__decorate([
    (0, common_1.Get)('state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "getState", null);
__decorate([
    (0, common_1.Post)('teams'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTeamDto]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addTeam", null);
__decorate([
    (0, common_1.Delete)('teams/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "deleteTeam", null);
__decorate([
    (0, common_1.Post)('tasks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addTask", null);
__decorate([
    (0, common_1.Delete)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Put)('scores'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateScoreDto]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "updateScore", null);
__decorate([
    (0, common_1.Put)('view'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChangeViewDto]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "changeView", null);
__decorate([
    (0, common_1.Post)('animate-scoreboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "animateScoreboard", null);
exports.TournamentController = TournamentController = __decorate([
    (0, common_1.Controller)('api/tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService,
        tournament_gateway_1.TournamentGateway])
], TournamentController);
//# sourceMappingURL=tournament.controller.js.map