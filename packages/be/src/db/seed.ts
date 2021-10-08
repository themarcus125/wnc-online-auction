import { UserRole } from '@/user/user.schema';
import UserService from '@/user/user.service';

export interface UserSeed {
  email: string;
  name: string;
  address: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
}

export interface CategorySeed {
  name: string;
  childs?: CategorySeed[];
}

export const seedDB = async (userSeeds: UserSeed[]) => {
  try {
    await Promise.allSettled([UserService.seed(userSeeds)]);
    console.log('[MG] Seed complete');
  } catch (e) {
    console.log('[MG] Seed failed', e);
  }
};
