// config/userMulter.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempPath = path.join('public', 'uploads', 'temp');
    fs.mkdirSync(tempPath, { recursive: true });
    cb(null, tempPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});


const userUpload = multer({ storage: userStorage });

export default userUpload;
