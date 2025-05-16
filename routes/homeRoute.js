// routes/home.js

import express from 'express';
import Post from '../models/Post.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
const router = express.Router();


router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  try {
    const userId = req.session.user.id;

    // 1. Fetch 10 random posts excluding posts by current user
    const posts = await Post.aggregate([
      { $match: { author: { $ne: new mongoose.Types.ObjectId(userId) } } },
      { $sample: { size: 10 } }
    ]);

    // 2. Populate author info for posts
    await Post.populate(posts, { path: 'author', select: 'username profileImage' });

    // 3. Get the IDs of these posts
    const postIds = posts.map(post => post._id);

    // 4. Find likes on these posts by the logged-in user
    const likedPosts = await Like.find({
      post: { $in: postIds },
      user: userId
    });

    // 5. Create a set of liked post IDs for quick lookup
    const likedPostIds = new Set(likedPosts.map(like => like.post.toString()));

    // 6. Add an 'isLiked' property to each post based on whether the user liked it
    posts.forEach(post => {
      post.isLiked = likedPostIds.has(post._id.toString());
    });

    // Optionally, fetch comments here similarly if you want to pass to view

    res.render('home', {
      user: req.session.user,
      posts
    });
  } catch (err) {
    console.error('Error loading home page posts:', err);
    res.status(500).send('Failed to load posts');
  }
});


// Export the router so it can be used in app.js
export default router;
