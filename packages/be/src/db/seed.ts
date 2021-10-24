import CategoryService from '@/category/category.service';
import UserService from '@/user/user.service';
import ProductService from '@/product/product.service';
import UpgradeRequestService from '@/upgradeRequest/upgradeRequest.service';
import { CategorySeed, ProductSeed, UserSeed } from './seed.t';
import { appConfig } from '~/config';
import { UserDoc } from '@/user/user.schema';
import { CategoryDoc } from '@/category/category.schema';
import { connectDB } from './connect';

const { mode } = appConfig;
let userA: UserDoc[];
let categoryA: CategoryDoc[];

const upgradeRequestSeed = async () => {
  if (mode !== 'development') return false;
  const model = UpgradeRequestService.getModel();
  await model.collection.drop();
  await model.syncIndexes();
  return true;
};

const userSeed = async (userSeeds: UserSeed[]) => {
  if (mode !== 'development') return false;
  const model = UserService.getModel();
  await model.collection.drop();
  await model.syncIndexes();
  userA = await model.insertMany(userSeeds);
  return true;
};

const categorySeed = async (
  parentSeeds: CategorySeed[],
  childSeeds: CategorySeed[],
) => {
  if (mode !== 'development') return false;
  const model = CategoryService.getModel();
  await model.collection.drop();
  await model.syncIndexes();
  const parentData = parentSeeds.map(({ name }) => ({
    name,
  }));
  const parentDoc = await model.insertMany(parentData);
  const childData = childSeeds.map(({ name, index }) => ({
    name,
    parent: index ? parentDoc[index]?._id : undefined,
  }));
  categoryA = await model.insertMany(childData);
  return true;
};

const productSeed = async (
  expriedProductSeeds: ProductSeed[],
  productSeeds: ProductSeed[],
) => {
  if (mode !== 'development') return false;
  const model = ProductService.getModel();
  await model.collection.drop();
  await model.syncIndexes();
  if (!userA || !categoryA) return false;
  await model.insertMany(
    expriedProductSeeds.map(
      ({
        name,
        descriptions,
        images,
        startPrice,
        stepPrice,
        currentPrice,
        expiredAt,
        category,
        seller,
        isAutoRenew,
        onlyRatedBidder,
      }) => ({
        name,
        descriptions,
        images,
        startPrice,
        stepPrice,
        currentPrice,
        expiredAt,
        category: categoryA[category]?._id,
        seller: userA[seller]?._id,
        isAutoRenew,
        onlyRatedBidder,
      }),
    ),
  );
  await model.insertMany(
    productSeeds.map(
      ({
        name,
        descriptions,
        images,
        startPrice,
        stepPrice,
        currentPrice,
        expiredAt,
        category,
        seller,
        isAutoRenew,
        onlyRatedBidder,
      }) => ({
        name,
        descriptions,
        images,
        startPrice,
        stepPrice,
        currentPrice,
        expiredAt,
        category: categoryA[category]?._id,
        seller: userA[seller]?._id,
        isAutoRenew,
        onlyRatedBidder,
      }),
    ),
  );
  return true;
};

export const seedDB = async (
  userSeeds: UserSeed[],
  cateSeeds: [CategorySeed[], CategorySeed[]],
  productSeeds: [ProductSeed[], ProductSeed[]],
) => {
  const connect = await connectDB();
  try {
    await Promise.allSettled([
      userSeed(userSeeds),
      upgradeRequestSeed(),
      categorySeed(cateSeeds[0], cateSeeds[1]),
    ]);
    await productSeed(productSeeds[0], productSeeds[1]);
    console.log('[MG] Seed complete');
  } catch (e) {
    console.log('[MG] Seed failed', e);
  } finally {
    return connect.disconnect();
  }
};
