import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; //For password hashing

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

// Registration route
//GET
router.get('/register', async (req, res) => {
  res.render('register'); // Render the registration page
});

//POST
router.post('/register', async (req, res) => {
  try {
    console.log('Registering user:', req.body);

    //We first need to check if the user email is already in the database

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    //We also need to check if the username is already in the database

    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    //Now that we have checked if the user already exists, we can create a new user
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    // res.status(201).json(savedUser);
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }



  // Login route
  //GET
  router.get('/login', async (req, res) => {
    // Handle login logic here
  });
  //POST
  router.post('/login', async (req, res) => {
    // Handle login logic here
  });

  // Profile route
  router.get('/profile', (req, res) => {
    // Render user profile page
  });
});


export default router;


