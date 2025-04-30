import express from 'express';
import User from './models/User.js'; // Ensure this is the correct path to your User model

const app = express();

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Get all users from DB
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users); // Respond with the users data
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
