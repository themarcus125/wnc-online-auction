import express from 'express';

import apiRouter from './api';
import statusRouter from './status';
const router = express.Router();

router.use('/status', statusRouter);
router.use('/api', apiRouter);
router.use('/', (req, res) => {
  res.json({
    message: 'Biddly server',
  });
});

export default router;
