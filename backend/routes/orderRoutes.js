import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

//ALL THESE ARE ACTUALLY /API/orders

router.route('/').post(protect, addOrderItems);

export default router;
