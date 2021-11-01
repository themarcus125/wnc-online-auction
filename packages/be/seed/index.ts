import { seedDB } from '@/db/seed';
import {
  childCategorySeeds,
  expiredProductSeeds,
  parentCategorySeeds,
  productSeeds,
  userSeeds,
  bidSeeds,
} from './testData';

seedDB(
  userSeeds,
  [parentCategorySeeds, childCategorySeeds],
  [expiredProductSeeds, productSeeds],
  bidSeeds,
);
