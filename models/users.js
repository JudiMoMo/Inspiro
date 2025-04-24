import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure unique emails
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Email validation regex
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create the model
const User = mongoose.model('User', userSchema);

export default User;
