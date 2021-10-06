import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/images/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

export const uploadHandler = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      return cb(null, true);
    }
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      return cb(null, true);
    }
    return cb(new Error('FILE_TYPE'));
  },
});
