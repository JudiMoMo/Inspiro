// require('dotenv').config(); // Cargar variables del .env
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // Middleware para procesar JSON
// app.use(express.json());

// // Conexión con MongoDB
// console.log('MongoDB URI:', process.env.MONGODB_URI); // Add this for debugging
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch((err) => console.error('Error al conectar a MongoDB:', err));

// // Rutas (aquí importas tu archivo auth.js por ejemplo)
// app.use('/api/auth', require('./routes/auth'));

// // Puerto
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';  // Importing the router correctly

dotenv.config();  // Load environment variables

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');  // This sets Pug as the templating engine
app.set('views', './views');  // This tells Express where to look for the view files

// Middleware to handle JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use routes (Make sure routes/index.js is exporting the router)
app.use('/api', routes);

// Serve the home page (this will render the 'index.pug' view)
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Inspiro!' });  // Render the 'index.pug' view
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
