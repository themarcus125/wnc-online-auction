import { BadRequest } from '@/error';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/images/uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname.toLocaleLowerCase()}-${Date.now()}${ext}`);
  },
});

export const uploadHandler = (bodyValidator?: (body: any) => string | null) =>
  multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (!req.body.isValidated && bodyValidator) {
        const error = bodyValidator(req.body);
        if (error) {
          return cb(new BadRequest(error));
        }
        req.body.isValidated = true;
      }

      if (file.mimetype === 'image/png') {
        return cb(null, true);
      }
      if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        return cb(null, true);
      }
      return cb(new BadRequest('FILE_UPLOAD_ERROR'));
    },
  });
