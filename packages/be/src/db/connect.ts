import mongoose from 'mongoose';
import { dbConnect } from '@/utils/logs';

import { appConfig, dbConfig } from '~/config';

export const connectDB = () => {
  const { url } = dbConfig;
  console.log(appConfig.mode);
  if (appConfig.mode === 'development')
    mongoose.set('debug', (collectionName, method, query, doc) => {
      console.log(
        `[MG] ${collectionName}.${method}`,
        JSON.stringify(query),
        doc,
      );
    });
  dbConnect();
  return mongoose.connect(url);
};
