import express from 'express';
const statusRouter = express.Router();

statusRouter.get('/status', (req, res) => {
  res.json({
    message: "I'm alive",
  });
});

export default statusRouter;
