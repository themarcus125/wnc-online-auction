import AuthService from '@/auth/auth.service';
import { NotFound, Unauthorized } from '@/error';
import UserService from '@/user/user.service';
import { Socket } from 'socket.io';

export const socketTokenGuard = async (socket: Socket, next: any) => {
  try {
    const token = socket.handshake.auth.token;
    const verifiedToken = AuthService.verify(token);
    if (!verifiedToken) {
      throw new Unauthorized('INVALID_TOKEN');
    }
    const user = await UserService.findById(verifiedToken.id);
    if (!user) {
      throw new NotFound('USER');
    }
    socket.data.jwtPayload = {
      id: user._id,
      isVerified: user.isVerified,
      role: user.role,
      email: user.email,
    };
    socket.data.user = user;
    next();
  } catch (e) {
    next(e); // client-side on "connect_error"
  }
};
