
import express from 'express';
import Post from '../models/Post.js'; // Adjust the path to your Post model
import upload from '../config/MulterConfig.js'; // 👈 Import your multer setup


const router = express.Router();


//GET to load the form to uplaod the post created by the user
router.get('/', async (req, res) => {

    
    // If logged in, send the user data to the post creation page

    res.render('post', {user: req.session.user }); // Render the posts page
});


// Route to create post
router.post('/', upload.array('image', 3), async (req, res) => {
  try {
    
      if (!req.files || req.files.length === 0) {
        return res.status(400).send('At least one image is required.');
      }

    const imagePaths = req.files.map(file => `/uploads/${req.session.user.username}/${file.filename}`);

    const newPost = new Post({
      ...req.body,
      // Assuming req.body contains the post content and title
      author: req.session.user.id, // Save author ID from session
      image: imagePaths, // Save image path
    });

    await newPost.save();
    return res.render('home', { user: req.session.user }); // Render the home page with user data
    // Redirect to the home page or wherever you want after creating the post
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post' + err.message);
  }
});

export default router;




