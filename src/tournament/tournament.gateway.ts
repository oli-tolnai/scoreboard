import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TournamentService } from './tournament.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TournamentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly tournamentService: TournamentService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Send current state to newly connected client
    client.emit('stateUpdate', this.tournamentService.getState());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  broadcastStateUpdate() {
    const state = this.tournamentService.getState();
    this.server.emit('stateUpdate', state);
  }

  broadcastViewChange(view: string) {
    this.server.emit('viewChange', { view });
  }

  triggerScoreboardAnimation() {
    this.tournamentService.setAnimating(true);
    this.server.emit('animateScoreboard');
    
    // Reset animation state after 10 seconds
    setTimeout(() => {
      this.tournamentService.setAnimating(false);
      this.broadcastStateUpdate();
    }, 10000);
  }
}
