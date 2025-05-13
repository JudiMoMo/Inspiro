import Post from '../models/Post.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';


//Render the create post form
export const renderCreatePostForm = (req, res) => {
  res.render('create-post', { user: req.session.user });
};


//Create a new post
// This function handles the creation of a new post
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


//Render the edit post form
// This function fetches the post by ID and renders the edit form
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


//Update a post
// This function updates the post with the provided data
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


//Delete a post
// This function deletes the post by ID
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


//Get all posts by a user
// This function fetches all posts by a specific user
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

//Get the view post page for a specific post
// This function fetches the view post page for a specific post
export const viewPost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    const post = await Post.findOne({ _id: postId, author: userId })
      .populate('author', 'username');

    if (!post) {
      return res.status(404).send('Post not found');
    }

    const postLikes = await Like.find({ post: postId }).populate('user', 'username');
    const postComments = await Comment.find({ post: postId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    
    // Extract only the post IDs of liked posts
    const likedPostIds = postLikes.map(like => like.post.toString());

    return res.render('specificPost', {
      layout: 'main',
      post,
      user: req.session.user,
      postLikes, 
      postComments,
      likedPostIds
    });
  } catch (err) {
    console.error('Error loading post:', err);
    return res.status(500).send('Internal server error');
  }
};
