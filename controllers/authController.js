import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

export const getRegister = (req, res) => {
  res.render('register');
};

export const postRegister = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('Email already exists.');

    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send('Username already exists.');

    let profileImagePath = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const fileName = 'profile-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;

      const oldPath = req.file.path;
      const newFolder = path.join('public', 'uploads', req.body.username, 'profile');
      const newPath = path.join(newFolder, fileName);

      fs.mkdirSync(newFolder, { recursive: true });
      fs.renameSync(oldPath, newPath);

      profileImagePath = `/uploads/${req.body.username}/profile/${fileName}`;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      profileImage: profileImagePath,
    });

    await newUser.save();
    res.redirect('/');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const getLogin = (req, res) => {
  res.redirect('/');
};

export const postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).render('index', { error: 'Invalid email or password', email: req.body.email });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).render('index', { error: 'Invalid email or password', email: req.body.email });
    }

    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      isLoggedIn: true
    };

    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).send('Could not save session');
      }
    });
    return res.redirect('/home');
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
};

export const getProfile = (req, res) => {
  res.render('profile');
};
