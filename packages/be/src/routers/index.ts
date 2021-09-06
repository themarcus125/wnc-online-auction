import express from 'express';

import { loading } from '@/utils/logs';
import apiRouter from './api';
import statusRouter from './status';
const router = express.Router();

router.use('/', (req, res) => {
  res.json({
    message: 'Biddly server',
  });
});
router.use(statusRouter);
loading('API router');
router.use(apiRouter);

export default router;
