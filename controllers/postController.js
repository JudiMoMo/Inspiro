import Post from '../models/Post.js';

export const renderCreatePostForm = (req, res) => {
  res.render('create-post', { user: req.session.user });
};

export const createPost = async (req, res) => {
  try {
    const username = req.body.username || req.session.user.username;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('At least one image is required.');
    }

    const imagePaths = req.files.map(file =>
      `/uploads/${username}/posts/${file.filename}`
    );

    const newPost = new Post({
      ...req.body,
      author: req.session.user.id,
      images: imagePaths,
    });

    await newPost.save();
    return res.render('home', { user: req.session.user });
  } catch (err) {
    console.error('Post creation error:', err);
    res.status(500).send('Error creating post: ' + err.message);
  }
};

export const renderEditPostForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    res.render('editPost', { user: req.session.user, post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post: ' + err.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    if (req.files.length > 0) {
      const username = req.body.username || req.session.user.username;
      post.images = req.files.map(file => `/uploads/${username}/posts/${file.filename}`);
    }

    await post.save();
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating post: ' + err.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    await post.remove();
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post: ' + err.message);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id; // Or use req.session.user.id for logged-in user

    const userPosts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    if (userPosts.length === 0) {
      return res.status(404).send('No posts found for this user.');
    }

    res.render('userPosts', { user: req.session.user, posts: userPosts });
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).send('Error fetching user posts: ' + err.message);
  }
};