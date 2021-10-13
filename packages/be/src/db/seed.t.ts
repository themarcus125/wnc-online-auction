import { UserRole } from '@/user/user.schema';

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
  index?: number;
}

export interface ProductSeed {
  name: string;
  descriptions: string[];
  category: number;
  images: string[];
  seller: number;
  startPrice: number;
  stepPrice: number;
  expiredAt: Date;
}
