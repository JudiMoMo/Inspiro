// routes/profileRoutes.js
import express from 'express';
import upload from '../config/multerConfigProfCover.js'; // ✅ custom multer config
import { 
  getProfilePage, 
  getProfileTab, 
  getEditProfilePage, 
  postEditProfile 
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfilePage);
router.get('/partials/:tab', getProfileTab);
router.get('/user/:id/edit', getEditProfilePage);

router.post(
  '/user/:id/edit',
  (req, res, next) => {
    // Manually set the username in the body if it is not there already
    req.body.username = req.body.username || req.session.user.username;  // You can get the username from the session if it's not in the form.
    next();
  },
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  postEditProfile
);
export default router;
