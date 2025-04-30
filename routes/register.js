// // import express from 'express';
// import User from '../models/User.js'; // Ensure this is the correct path to your User model
// import bcrypt from 'bcryptjs';

// router.post('/register', async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         const newUser = new User({
//             ...req.body,
//             password: hashedPassword,
//         });

//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json({ message: 'Error registering user' });
//     }
// });
