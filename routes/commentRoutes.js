import express from 'express';
import { 
    createComment, 
    getComments, 
    getComment,
    updateComment,
    deleteComment
 } from '../controllers/commentController.js';

const router = express.Router();
// Route to get all comments for a specific post
router.get('/:postId', getComments);
// Route to add a new comment to a specific post
router.post('/user/:userId/post/:postId', createComment);
// Route to get a specific comment
router.get('/:commentId', getComment);
// Route to update a specific comment
router.put('/:commentId', updateComment);
// Route to delete a specific comment
router.delete('/:commentId', deleteComment);
// Export the router to be used in app.js
export default router;
// This code defines the routes for handling comments in a blog application.