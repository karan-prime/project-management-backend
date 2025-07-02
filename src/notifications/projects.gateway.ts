import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
})
export class ProjectsGateway {
  @WebSocketServer()
  server: Server;

  handleProjectUpdate(project: any) {
    this.server.emit('projectUpdated', project);
  }

  handleProjectCreated(project: any) {
    this.server.emit('projectCreated', project);
  }

  handleProjectDeleted(project: any) {
    this.server.emit('projectDeleted', project);
  }
}
