import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `temp-${file.originalname}`);
    }
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    },
    fileFilter: (req, file, cb) => {
       const filetypes = /jpeg|jpg|png|gif/;
       const mimetype = filetypes.test(file.mimetype);
       const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
       if (mimetype && extname) {
           return cb(null, true);
       } else {
           cb(new Error('Only images are allowed'));
       }
    }
});