import { seedDB } from '@/db/seed';
import { argv } from 'process';

const path = argv[2] || './testData';
console.log('Load data from', path);

import(path).then(
  ({
    childCategorySeeds,
    expiredProductSeeds,
    parentCategorySeeds,
    productSeeds,
    userSeeds,
    bidSeeds,
  }) => {
    seedDB(
      userSeeds,
      [parentCategorySeeds, childCategorySeeds],
      [expiredProductSeeds, productSeeds],
      bidSeeds,
    );
  },
);
