import express from 'express';

import apiRouter from './api';
import statusRouter from './status';
const router = express.Router();

router.use('/status', statusRouter);
router.use('/api', apiRouter);

export default router;
