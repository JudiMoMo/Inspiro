import express from 'express';
import { likePost, unlikePost, getPostLikes } from '../controllers/likeController.js';

const router = express.Router();

router.post('/:postId/like', likePost);
router.delete('/:postId/unlike', unlikePost);
router.get('/:postId/likes', getPostLikes);

export default router;
