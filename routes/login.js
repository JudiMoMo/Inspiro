// import User from '../models/User.js'; // Ensure this is the correct path to your User model
// import jwt from 'jsonwebtoken';

// router.post('/login', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

//     // Generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(200).json({ token, user: { name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });