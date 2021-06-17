import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//ALL THESE ARE ACTUALLY /API/USERS/ AND /API/USERS/LOGIN
router.route('/').post(registerUser);
router.post('/login', authUser);
//to implement middleware use it as first parameter
//jab bhi iss route ko visit karenge middleware run karega
//use router.route kyumki hume get req bhi chaahiye  aur profile update karwane ke liye put request bhi to get request hui ya put hui usi hissab se data pass hoga
//aur ye get put requests axios ke through data lete time karte hai hum
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
