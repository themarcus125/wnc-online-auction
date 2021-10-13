import { seedDB } from '@/db/seed';
import { childCategorySeeds, parentCategorySeeds, userSeeds } from './testData';

seedDB(userSeeds, [parentCategorySeeds, childCategorySeeds]);
