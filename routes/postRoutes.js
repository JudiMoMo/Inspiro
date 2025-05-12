import express from 'express';
import postUpload from '../config/multerConfigPost.js';
import {
    renderCreatePostForm,
    createPost,
    renderEditPostForm,
    updatePost,
    deletePost,
    getUserPosts,
    viewPost
} from '../controllers/postController.js';

const router = express.Router();

router.get('/create-post', renderCreatePostForm);
router.post('/create-post', postUpload.array('image', 3), createPost);
router.get('/edit/:id', renderEditPostForm);
router.post('/edit/:id', postUpload.array('image', 3), updatePost);
router.get('/delete/:id', deletePost);
router.get('/user/:id', getUserPosts); // Example: /posts/user/12345
router.get('/user/:userId/post/:postId', viewPost); // Example: /posts/user/12345/post/67890

export default router;


