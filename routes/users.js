import express from 'express';
import User from '../models/User.js'; // Ensure this is the correct path to your User model

const app = express();

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Get all users from DB
    res.status(200).json(users); // Respond with the users data
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, surname, email, username, password, phone, bio, category, profileImage } = req.body;

  try {
    const newUser = new User({
      name,
      surname,
      email,
      username,
      password,
      phone,
      bio,
      category,
      profileImage,
      createdAt: new Date(),
    });

    await newUser.save();
    res.status(201).json(newUser); // Respond with the created user
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;


