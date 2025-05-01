// routes/home.js

import express from 'express';
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  // Check if the user is logged in by verifying the session
  if (!req.session.isLoggedIn) {
    return res.redirect('/login'); // Redirect to login if user is not logged in
  }

  // If logged in, send the user data to the home page
  const user = {
    name: req.session.username,
    email: req.session.email,
    profileImage: req.session.profileImage,
  };

  // Render the home page with user data
  res.render('home', { user });
});

// Export the router so it can be used in app.js
export default router;
