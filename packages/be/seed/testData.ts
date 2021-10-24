import { CategorySeed, ProductSeed, UserSeed } from '@/db/seed.t';
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
    password: hashedPassword,
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'seller2@sample.com',
    name: 'seller2',
    address: 'seller2',
    password: hashedPassword,
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'seller3@sample.com',
    name: 'seller3',
    address: 'seller3',
    password: hashedPassword,
    role: UserRole.SELLER,
    isVerified: true,
  },
  {
    email: 'bidder1@sample.com',
    name: 'bidder1',
    address: 'bidder1',
    password: hashedPassword,
    role: UserRole.BIDDER,
    isVerified: true,
  },
];

export const parentCategorySeeds: CategorySeed[] = [
  {
    name: 'parent 1',
  },
  {
    name: 'parent 2',
  },
  {
    name: 'parent 3',
  },
  {
    name: 'parent 4',
  },
];

export const childCategorySeeds: CategorySeed[] = [
  {
    name: 'parent 1 child 1',
    index: 1,
  },
  {
    name: 'parent 1 child 2',
    index: 1,
  },
  {
    name: 'parent 1 child 3',
    index: 1,
  },
  {
    name: 'parent 2 child 1',
    index: 2,
  },
  {
    name: 'parent 2 child 2',
    index: 2,
  },
  {
    name: 'parent 2 child 3',
    index: 2,
  },
  {
    name: 'parent 3 child 1',
    index: 3,
  },
  {
    name: 'parent 3 child 2',
    index: 3,
  },
  {
    name: 'parent 3 child 3',
    index: 3,
  },
  {
    name: 'parent 4 child 1',
    index: 4,
  },
  {
    name: 'parent 4 child 2',
    index: 4,
  },
  {
    name: 'parent 4 child 3',
    index: 4,
  },
];

export const expiredProductSeeds: ProductSeed[] = [
  {
    name: 'expiredProduct1',
    descriptions: ['expiredProduct1 - seller1'],
    category: 0,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 0,
    startPrice: 10000,
    currentPrice: 10000,
    stepPrice: 1000,
    expiredAt: new Date(Date.now() + 1000),
  },
  {
    name: 'expiredProduct2',
    descriptions: ['expiredProduct2 - seller1'],
    category: 0,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 0,
    startPrice: 20000,
    currentPrice: 20000,
    stepPrice: 1000,
    expiredAt: new Date(Date.now() + 1000),
  },
  {
    name: 'expiredProduct3',
    descriptions: ['expiredProduct3 - seller1'],
    category: 0,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 0,
    startPrice: 30000,
    currentPrice: 30000,
    stepPrice: 1000,
    expiredAt: new Date(Date.now() + 1000),
  },
];

export const productSeeds: ProductSeed[] = [
  {
    name: 'product1',
    descriptions: ['product1 - seller2'],
    category: 1,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 1,
    startPrice: 10000,
    currentPrice: 10000,
    stepPrice: 1000,
    expiredAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  },
  {
    name: 'product2',
    descriptions: ['product2 - seller2'],
    category: 1,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 1,
    startPrice: 20000,
    currentPrice: 20000,
    stepPrice: 1000,
    expiredAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  },
  {
    name: 'product3',
    descriptions: ['product3 - seller2'],
    category: 1,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 1,
    startPrice: 30000,
    currentPrice: 30000,
    stepPrice: 1000,
    onlyRatedBidder: true,
    expiredAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  },
  {
    name: 'product4',
    descriptions: ['product4 - seller2 - expired soon'],
    category: 1,
    images: [
      'public/images/uploads/seed-pepekora.png',
      'public/images/uploads/seed-copium.png',
      'public/images/uploads/seed-pepe-angry.png',
      'public/images/uploads/seed-pepe-hand.png',
    ],
    seller: 1,
    startPrice: 30000,
    currentPrice: 30000,
    stepPrice: 1000,
    isAutoRenew: true,
    expiredAt: new Date(Date.now() + 5 * 60 * 1000),
  },
];
