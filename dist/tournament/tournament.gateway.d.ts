import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TournamentService } from './tournament.service';
export declare class TournamentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly tournamentService;
    server: Server;
    constructor(tournamentService: TournamentService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    broadcastStateUpdate(): void;
    broadcastViewChange(view: string): void;
    triggerScoreboardAnimation(): void;
}
