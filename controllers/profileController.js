import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Like from '../models/Like.js';

export const getProfilePage = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.session.user.id }).sort({ createdAt: -1 });

    // Find all posts liked by the current user
    const likedPosts = await Like.find({ user: req.session.user.id }).select('post');  // Gets the post IDs

    // Extract only the post IDs of liked posts
    const likedPostIds = likedPosts.map(like => like.post.toString());


    return res.render('profile', { user: req.session.user, userPosts: posts, likedPostIds: likedPostIds });
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
    // Find all posts liked by the current user
    const likedPosts = await Like.find({ user: req.session.user.id }).select('post');  // Gets the post IDs
    // Extract only the post IDs of liked posts
    const likedPostIds = likedPosts.map(like => like.post.toString());

    return res.render(`partials/${tab}`, {
      layout: false,
      userPosts: userPosts,
      user: req.session.user,
      likedPostIds: likedPostIds
    });
  } catch (err) {
    console.error('Error loading tab:', err);
    return res.status(500).send('Internal server error');
  }
};


export const getEditProfilePage = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    return res.render('edit-profile', { user: req.session.user});
  } catch (err) {
    console.error('Error loading edit profile page:', err);
    return res.status(500).send('Internal server error');
  }
}





export const postEditProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files); // Assuming you're using upload.fields()

    // Update basic info
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.bio = req.body.bio || user.bio;
    user.gender = req.body.gender || user.gender;
    user.artistType = req.body.artistType || user.artistType;

    const username = req.body.username || user.username; // Important for folder path

    // === Handle Profile Image ===
    if (req.files && req.files.profileImage && req.files.profileImage[0]) {
      const file = req.files.profileImage[0];
      const ext = path.extname(file.originalname);
      const fileName = 'profile-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
      const newFolder = path.join('public', 'uploads', username, 'profile');
      const newPath = path.join(newFolder, fileName);

      fs.mkdirSync(newFolder, { recursive: true });
      fs.renameSync(file.path, newPath);

      user.profileImage = `/uploads/${username}/profile/${fileName}`;
    }

    // === Handle Cover Image ===
    if (req.files && req.files.coverImage && req.files.coverImage[0]) {
      const file = req.files.coverImage[0];
      const ext = path.extname(file.originalname);
      const fileName = 'cover-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
      const newFolder = path.join('public', 'uploads', username, 'cover');
      const newPath = path.join(newFolder, fileName);

      fs.mkdirSync(newFolder, { recursive: true });
      fs.renameSync(file.path, newPath);

      user.coverImage = `/uploads/${username}/cover/${fileName}`;
    }

    // Save user
    await user.save();

    // Update session data
    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      coverImage: user.coverImage,
      isLoggedIn: true
    };

    // Get user posts and liked posts
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
    const likedPosts = await Like.find({ user: user._id }).select('post');
    const likedPostIds = likedPosts.map(like => like.post.toString());

    // Render updated profile
    return res.render('profile', {
      user: req.session.user,
      userPosts: posts,
      likedPostIds: likedPostIds
    });

  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).send('Internal server error');
  }
};
