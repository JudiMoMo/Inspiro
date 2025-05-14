import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  username: String,
  gender: String,
  password: String,
  phone: String,
  bio: String,
  category: String,
  profileImage: String,
  coverImage: String,
  createdAt: Date,
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
});

const User = mongoose.model('User', userSchema, "Users");



// Export the User model for use in other parts of the application
// This allows you to import the User model in other files using `import User from './models/User.js';`
// or `const User = require('./models/User.js');` depending on your module system.
// This is useful for creating, reading, updating, and deleting user documents in the MongoDB database.

export default User;
