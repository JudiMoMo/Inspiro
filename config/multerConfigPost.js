// config/postMulter.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.body.username || req.session.user.username; // Use session username or from form
    const postFolder = path.join('public', 'uploads', username, 'posts');

    // Create the folder if it doesn't exist
    if (!fs.existsSync(postFolder)) {
      fs.mkdirSync(postFolder, { recursive: true });
    }

    cb(null, postFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'post-' + uniqueSuffix + ext); // Naming for post images
  }
});

const postUpload = multer({ storage: postStorage });

export default postUpload;
