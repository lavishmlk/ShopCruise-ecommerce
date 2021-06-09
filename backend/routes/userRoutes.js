import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
//to implement middleware use it as first parameter
//jab bhi iss route ko visit karenge middleware run karega
//use router.route kyumki hume get req bhi chaahiye aur aage jaake profile update karwane ke liye put request bhi
router.route('/profile').get(protect, getUserProfile);

export default router;
