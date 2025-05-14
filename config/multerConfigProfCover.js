// config/multerConfigUser.js

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the user's folder structure exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the user's username is in session
    const username = req.session.user?.username; // Using session data to access username
    if (!username) {
      // If username is not found, return an error
      return cb(new Error('Username not found in session'), null);
    }

    // User folder path
    const userFolder = path.join('public', 'uploads', username);

    // Create the necessary folder structure (profile or cover)
    const folderPath = file.fieldname === 'profileImage'
      ? path.join(userFolder, 'profile')
      : path.join(userFolder, 'cover');
      
    // Create folder if it doesn't exist
    fs.mkdirSync(folderPath, { recursive: true });

    // Specify destination folder
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const prefix = file.fieldname === 'profileImage' ? 'profile' : 'cover';
    cb(null, `${prefix}-${uniqueSuffix}${ext}`);
  }
});

// Multer instance with storage config
const upload = multer({ storage });

export default upload;
