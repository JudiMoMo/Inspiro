import express from 'express';
import { getProfilePage, getProfileTab, getEditProfilePage } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfilePage);
router.get('/partials/:tab', getProfileTab);
router.get('/edit', getEditProfilePage);

export default router;
