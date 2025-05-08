import Post from '../models/Post.js';
import Like from '../models/Like.js';

export const getProfilePage = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.session.user.id }).sort({ createdAt: -1 });

    // Find all posts liked by the current user
    const likedPosts = await Like.find({ user: req.session.user.id }).select('post');  // Gets the post IDs

    // Extract only the post IDs of liked posts
    const likedPostIds = likedPosts.map(like => like.post.toString());


    return res.render('profile', { user: req.session.user, userPosts: posts,  likedPostIds: likedPostIds });
  } catch (err) {
    console.error('Error loading profile:', err);
    return res.status(500).send('Internal server error');
  }
};

export const getProfileTab = async (req, res) => {
  const tab = req.params.tab;
  const validTabs = ['posts', 'portfolio', 'tagged'];

  if (!validTabs.includes(tab)) {
    return res.status(404).send('Not Found');
  }

  try {
    const userId = req.session.user?.id;
    const userPosts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    return res.render(`partials/${tab}`, {
      layout: false,
      userPosts,
      user: req.session.user
    });
  } catch (err) {
    console.error('Error loading tab:', err);
    return res.status(500).send('Internal server error');
  }
};
