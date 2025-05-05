
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

router.get('/partials/:tab', async (req, res) => {
    const tab = req.params.tab;
    const validTabs = ['posts', 'portfolio', 'tagged'];

    if (!validTabs.includes(tab)) {
        return res.status(404).send('Not Found');
    }

    try {
        const userId = req.session.user?.id;
        const userPosts = await Post.find({ author: userId });

        return res.render(`partials/${tab}`, {
            layout: false,
            userPosts,
            user: req.session.user // if needed in your partial
        });
    } catch (err) {
        console.error('Error loading tab:', err);
        return res.status(500).send('Internal server error');
    }
});


export default router;
