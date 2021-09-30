import mongoose from 'mongoose';
import { dbConnect } from './utils/logs';

import { dbConfig } from '~/config';
import UserService from './user/user.service';

export const connectDB = () => {
  const { url } = dbConfig;
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`[MG] ${collectionName}.${method}`, JSON.stringify(query), doc);
  });
  dbConnect();
  return mongoose.connect(url);
};

export const seedDB = async () => {
  try {
    await UserService.createSA();
  } catch (e) {
    console.log('[MG] Seed failed', e);
  }
};

// https://mongoosejs.com/docs/typescript/populate.html
