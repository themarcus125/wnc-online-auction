import express from 'express';
const statusRouter = express.Router();

statusRouter.get('/', (req, res) => {
  res.json({
    message: "I'm alive",
  });
});

export default statusRouter;
