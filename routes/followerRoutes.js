import express from 'express';
import { getFollowers, getFollowing, followUser, unfollowUser } from '../controllers/followerController.js';

const router = express.Router();
// Route to get followers of a user
router.get('/:id/followers', getFollowers);
// Route to get users that a user is following
router.get('/:id/following', getFollowing);
// Route to add a follower
router.post('/:id/follow', followUser);
// Route to remove a follower
router.delete('/:id/unfollow', unfollowUser);
// Export the router to be used in other parts of the application
export default router;