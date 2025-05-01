import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
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

export default router;


