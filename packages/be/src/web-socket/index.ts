import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

export const getIO = () => {
  if (!io) throw new Error('No Socket.io');
  return io;
};

const initSocketIO = (server: HTTPServer) => {
  if (io) return io;
  io = new Server(server);
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  return io;
};

export default initSocketIO;
