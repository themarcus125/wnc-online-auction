import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { socketTokenGuard } from './socket.guard';
import { connectionHandler } from './io.handler';

let io: Server;

export const getIO = () => {
  if (!io) return null;
  return io;
};

const initSocketIO = (server: HTTPServer) => {
  if (io) return io;
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  io.use(socketTokenGuard);
  io.on('connection', connectionHandler);
  return io;
};

export enum CustomEvent {
  // Listen
  PING = 'ping',
  // Emit
  PONG = 'pong',
  CONNECTED = 'connected',
  PLACED_BID = 'placed_bid',
  REJECTED_BID = 'rejected_bid',
}

export default initSocketIO;
