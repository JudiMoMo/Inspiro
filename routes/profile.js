
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    // Check if the user is logged in by verifying the session
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/'); // Redirect to login if user is not logged in
    // }

    // If logged in, send the user data to the profile page
    const user = {
        name: req.session.username,
        email: req.session.email,
        profileImage: req.session.profileImage,
        bio: req.session.bio,
        category: req.session.category
    };

    req.session.save(() => {
        res.render('profile', { user }); // Render the profile page with user data
    });
    

});

export default router;
