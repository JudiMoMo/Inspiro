// routes/AuthRouter.js

import express from 'express';
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout,
  getProfile
} from '../controllers/AuthController.js';

import userUpload from '../config/MulterConfigUser.js';

const router = express.Router();

router.get('/register', getRegister);
router.post('/register', userUpload.single('profileImage'), postRegister);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/logout', logout);

router.get('/profile', getProfile);

export default router;
