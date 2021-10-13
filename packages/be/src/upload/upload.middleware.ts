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

export const uploadHandler = (bodyValidator?: (body: any) => string) =>
  multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      console.log(req.files);
      if (!req.body.isValidated && bodyValidator) {
        const isValid = bodyValidator(req.body);
        if (isValid !== 'VALID') {
          return cb(new BadRequest(isValid));
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
