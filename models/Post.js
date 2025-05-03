import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  title: { type: String },
  images: [{ type: String }], // changed from 'image' to 'images' and made it an array
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Posts', postSchema, "Posts");

export default Post;
// Export the Post model for use in other parts of the application
// This allows you to import the Post model in other files using `import Post from './models/Post.js';`
