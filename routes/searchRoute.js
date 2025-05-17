import express from 'express';
import { searchUsersPosts , explore} from '../controllers/searchController.js';

const router = express.Router();

// Route to search for users and posts
router.get('/:query', searchUsersPosts);
// Route to render the explore page
router.get('/', explore);


export default router;
