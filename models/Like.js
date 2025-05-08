import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Ensure a user can like a post only once
likeSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.model('Like', likeSchema, 'Likes');
