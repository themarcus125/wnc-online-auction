import { CategorySeed, UserSeed } from '@/db/seed';
import { UserRole } from '@/user/user.schema';
import { getHashedPassword } from '@/utils/password';
import { appConfig } from '~/config';

const password = appConfig.jwtSecret;
const hashedPassword = getHashedPassword(password);

export const userSeeds: UserSeed[] = [
  {
    email: 'super@admin.com',
    name: 'superadmin',
    address: 'superadmin',
    password: hashedPassword,
    role: UserRole.SUPPER_ADMIN,
    isVerified: true,
  },
  {
    email: 'seller1@sample.com',
    name: 'seller1',
    address: 'seller1',
    password: 'seller1',
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'seller2@sample.com',
    name: 'seller2',
    address: 'seller2',
    password: 'seller2',
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'seller2@sample.com',
    name: 'seller2',
    address: 'seller2',
    password: 'seller2',
    role: UserRole.SELLER,
    isVerified: true,
  },
];

export const parentCategory: CategorySeed[] = [
  {
    name: 'parent 1',
    childs: [
      {
        name: 'parent 1 child 1',
      },
      {
        name: 'parent 1 child 2',
      },
      {
        name: 'parent 1 child 3',
      },
    ],
  },
  {
    name: 'parent 2',
    childs: [
      {
        name: 'parent 2 child 1',
      },
      {
        name: 'parent 2 child 2',
      },
      {
        name: 'parent 2 child 3',
      },
    ],
  },
  {
    name: 'parent 3',
    childs: [
      {
        name: 'parent 3 child 1',
      },
      {
        name: 'parent 3 child 2',
      },
      {
        name: 'parent 3 child 3',
      },
    ],
  },
  {
    name: 'parent 4',
    childs: [
      {
        name: 'parent 4 child 1',
      },
      {
        name: 'parent 4 child 2',
      },
      {
        name: 'parent 4 child 3',
      },
    ],
  },
];
