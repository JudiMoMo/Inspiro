
import express from 'express';
import Post from '../models/Post.js'; // Adjust the path to your Post model
import upload from '../config/MulterConfig.js'; // 👈 Import your multer setup


const router = express.Router();


//GET to load the form to uplaod the post created by the user
router.get('/', async (req, res) => {


  // If logged in, send the user data to the post creation page

  res.render('post', { user: req.session.user }); // Render the posts page
});


// Route to create post
router.post('/', upload.array('image', 3), async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('At least one image is required.');
    }

    // const imagePaths = req.files.map(file => `/uploads/${req.session.user.username}/${file.filename}`);
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);



    const newPost = new Post({
      ...req.body,
      // Assuming req.body contains the post content and title
      author: req.session.user.id, // Save author ID from session
      images: imagePaths, // Save image path
    });

    await newPost.save();
    return res.render('home', { user: req.session.user }); // Render the home page with user data
    // Redirect to the home page or wherever you want after creating the post
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post' + err.message);
  }
});

//route to edit an specific post
router.get('/edit/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('editPost', { user: req.session.user, post }); // Render the edit post page with user data and post data
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post' + err.message);
  }
});

//route to update an specific post
router.post('/edit/:id', upload.array('image', 3), async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    // Update the post with new data
    post.content = req.body.content || post.content; // Update content if provided
    post.title = req.body.title || post.title; // Update title if provided
    post.images = req.files.map(file => `/uploads/${file.filename}`); // Update images with new files
    await post.save();
    res.redirect('/home'); // Redirect to the home page or wherever you want after updating the post
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating post' + err.message);
  }
});

//route to delete an specific post
router.get('/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    await post.remove(); // Delete the post
    res.redirect('/home'); // Redirect to the home page or wherever you want after deleting the post
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post' + err.message);
  }
});

export default router;




