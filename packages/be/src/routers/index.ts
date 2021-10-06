import express from 'express';

import apiRouter from './api';
import statusRouter from './status';
import uploadRouter from '@/upload/test.route';
const router = express.Router();

router.use('/status', statusRouter);
router.use('/api', apiRouter);
router.use('/upload', uploadRouter);

export default router;
