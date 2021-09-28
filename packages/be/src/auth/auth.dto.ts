import { UserRole } from '@/user/user.schema';
import { CreateUserDTO } from '@/user/user.dto';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends CreateUserDTO {}

export interface JWTResponse {
  accessToken: string;
  expiresIn: number;
  expiresAt: number;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}
