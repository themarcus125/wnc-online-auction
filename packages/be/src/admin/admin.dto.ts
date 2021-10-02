import { UserRole } from '@/user/user.schema';

export interface AdminUpdateUserDTO {
  email?: string;
  dob?: Date;
  name?: string;
  address?: string;
  role?: UserRole;
  isVerified?: boolean;
}
