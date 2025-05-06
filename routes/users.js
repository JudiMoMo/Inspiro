import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; //For password hashing
import userUpload from '../config/MulterConfigUser.js'; // ✅ correct casing
import path from 'path';
import fs from 'fs'; // For file system operations

const router = express.Router();

// Registration route
//GET
router.get('/register', async (req, res) => {
  res.render('register'); // Render the registration page
});



//POST
// POST registration route

router.post('/register', userUpload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Check for existing email or username
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('Email already exists.');

    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).send('Username already exists.');

    // 2️⃣ Set profileImagePath only if file exists
    let profileImagePath = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const fileName = 'profile-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;

      const oldPath = req.file.path;
      const newFolder = path.join('public', 'uploads', username, 'profile');
      const newPath = path.join(newFolder, fileName);

      fs.mkdirSync(newFolder, { recursive: true });
      fs.renameSync(oldPath, newPath);

      profileImagePath = `/uploads/${username}/profile/${fileName}`;
    }

    // 3️⃣ Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileImage: profileImagePath,
    });

    await newUser.save();

    res.redirect('/');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Internal Server Error');
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
      return res.status(400).render('index', { error: 'Invalid email or password', email }); // Keep entered email
    }


    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('index', { error: 'Invalid email or password', email });
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


