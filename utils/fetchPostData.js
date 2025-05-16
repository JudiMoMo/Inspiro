import Post from '../models/Post.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';
import mongoose from 'mongoose';

export const fetchPostsWithExtras = async (userId, filter = {}) => {
  // Get posts (e.g. for a user, or exclude self for home)
  const posts = await Post.find(filter).sort({ createdAt: -1 });

  const postIds = posts.map(post => post._id);

  const [likes, comments] = await Promise.all([
    Like.find({ post: { $in: postIds } }),
    Comment.find({ post: { $in: postIds } }).populate('user', 'username profileImage')
  ]);

  const likedPostIds = likes
    .filter(like => like.user.toString() === userId.toString())
    .map(like => like.post.toString());

  // Populate authors
  await Post.populate(posts, {
    path: 'author',
    select: 'username profileImage'
  });

  return { posts, likedPostIds, comments };
};
