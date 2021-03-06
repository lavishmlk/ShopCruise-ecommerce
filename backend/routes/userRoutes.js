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

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
