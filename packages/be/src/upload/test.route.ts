import { removeAll } from '@/utils/file';
import express from 'express';
import path from 'path';
import { uploadHandler } from './upload.middleware';

export const uploadRouter = express.Router();

uploadRouter.get('/', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`
    <h2>With Node.js <code>"multer"</code></h2>
    <form action="/upload" enctype="multipart/form-data" method="post">
      <div><input type="text" name="title" /></div>
      <div><input id="file" type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

uploadRouter.post(
  '/',
  uploadHandler().array('multipleFiles', 10),
  (req, res, next) => {
    const files = req.files as Express.Multer.File[];
    try {
      if (req.body.title === 'error') throw new Error('error');
      console.log(files, req.body);
      res.status(200).end();
    } catch (e) {
      console.log(path.join(files[0].destination, files[0].filename));
      removeAll(files.map((f) => path.join(f.destination, f.filename)));
      next(e);
    }
  },
);

export default uploadRouter;
