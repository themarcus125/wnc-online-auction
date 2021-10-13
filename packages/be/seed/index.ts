import { seedDB } from '@/db/seed';
import {
  childCategorySeeds,
  expiredProductSeeds,
  parentCategorySeeds,
  productSeeds,
  userSeeds,
} from './testData';

seedDB(
  userSeeds,
  [parentCategorySeeds, childCategorySeeds],
  [expiredProductSeeds, productSeeds],
);
