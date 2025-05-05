import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; //For password hashing
import upload from '../config/MulterConfig.js'; // 👈 Import your multer setup

const router = express.Router();

// Registration route
//GET
router.get('/register', async (req, res) => {
  res.render('register'); // Render the registration page
});

//POST
// Handle registration with file upload
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const profileImagePath = req.file ? '/uploads/' + req.file.filename : null;


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
      profileImage: profileImagePath,
    });

    savedUser = await newUser.save();
    res.redirect('/'); // Redirect to the login page after successful registration
  } catch (err) {
    console.error('Error registering user:', err); // More specific error logs
    res.status(500).json({ message: 'Error registering user' });
  }
});




// Login route
//GET
router.get('/login', async (req, res) => {
  res.redirect('/'); // Render the login page
});

//POST
// POST login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }


    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Set session data
    // req.session.userId = user._id.toString(); // Convert ObjectId to string
    // req.session.username = user.username;
    // req.session.profileImage = user.profileImage;
    // req.session.isLoggedIn = true;

    req.session.user = {
      id: user._id.toString(),        // Store the ID as a string
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      isLoggedIn: true                // Optional, since presence of user implies logged in
    };

    // Only one response, and we return to prevent further code from executing
    return res.redirect('/home'); // Redirect to the home page after successful login

  } catch (err) {
    return res.status(500).send('Server error');
  }
});


// Profile route
router.get('/profile', (req, res) => {
  // Render user profile page
});


export default router;


