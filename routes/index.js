import express from 'express';

const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

export default router;
