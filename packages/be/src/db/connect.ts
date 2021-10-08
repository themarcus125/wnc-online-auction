import mongoose from 'mongoose';
import { dbConnect } from '@/utils/logs';

import { dbConfig } from '~/config';
import { ProductModel } from '@/product/product.schema';
import { CategoryModel } from '@/category/category.schema';

export const connectDB = () => {
  const { url } = dbConfig;
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`[MG] ${collectionName}.${method}`, JSON.stringify(query), doc);
  });
  dbConnect();
  return mongoose.connect(url);
};

export const syncIndexes = async () => {
  console.log(`[MG] Sync Indexes`);
  try {
    Promise.allSettled([
      ProductModel.syncIndexes(),
      CategoryModel.syncIndexes(),
    ]);
  } catch (e) {}
};
