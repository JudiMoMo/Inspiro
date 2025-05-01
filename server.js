import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';  // Importing the main routes
import userRoutes from './routes/users.js';  // Importing the user-specific routes

dotenv.config();  // Load environment variables

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');  // Directory for Pug files

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Compass');
  })
  .catch((err) => console.error('Error connecting to MongoDB Compass:', err));
// Use the routes
app.use('/api', routes);  // This will handle routes from index.js
app.use('/api/users', userRoutes);  // This will handle routes from user.js

// Home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Express with Pug!' });  // Render the 'index.pug' view

});



// Start the server
const PORT = process.env.PORT || 3001;  // Use the port from environment variables or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT} → http://localhost:${PORT}`));
