import express from 'express';
import { getProfilePage, getProfileTab } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfilePage);
router.get('/partials/:tab', getProfileTab);

export default router;
