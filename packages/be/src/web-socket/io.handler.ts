import { UserDoc } from '@/user/user.schema';
import { Socket } from 'socket.io';
import { CustomEvent } from './socket.io';

export const connectionHandler = (socket: Socket) => {
  const { user }: { user: UserDoc } = socket.data;
  // Socket event listener
  socket.on('disconnect', () => console.log(`[SOCKET] ${user._id} DISCONNECT`));
  socket.on('connect_error', console.error);
  // Custom event listener
  socket.on(
    CustomEvent.PING,
    ({ message }: { message: String }, ackCallBack) => {
      console.log(`[SOCKET] ${message}`);
      ackCallBack(null, { message: 'PONG' });
      socket.emit(CustomEvent.PONG, { message: 'PONG' });
    },
  );
  // Emitter
  socket.emit(CustomEvent.CONNECTED, { message: 'CONNECTED' }, () => {
    console.log(`[SOCKET] ${socket.id} ${CustomEvent.CONNECTED} ACK`);
  });
};
