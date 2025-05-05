
import express from 'express';
import Post from '../models/Post.js'; // Import the Post model

const router = express.Router();

router.get('/', async (req, res) => {
    // Check if the user is logged in by verifying the session
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/'); // Redirect to login if user is not logged in
    // }

    // If logged in, send the user data to the profile page

    // Fetch the posts created by the user
    const posts = await Post.find({ author: req.session.user.id }).sort({ createdAt: -1 }); // Sort by date created (optional)

    return res.render('profile', { user: req.session.user, userPosts: posts }); // Render the profile page with user data



});

export default router;
