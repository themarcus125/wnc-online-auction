import mongoose from 'mongoose';
import { dbConnect } from '@/utils/logs';

import { dbConfig } from '~/config';

export const connectDB = () => {
  const { url } = dbConfig;
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`[MG] ${collectionName}.${method}`, JSON.stringify(query), doc);
  });
  dbConnect();
  return mongoose.connect(url);
};
