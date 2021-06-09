//ye file mainly niche jo routes defined hai unpe data bhejne ke liye hai
//based on video 7 from getting started with mongodb and took help from -> Adding Express Router in RESTful API in Hindi in 2020 videos by thapa technical
//then video 1 of backend user authentication

import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// router.get('/',getProducts) aise bhi likh sakte the
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;

/*
import express from 'express';
const router = express.Router();
import Product from '../Models/productModel.js';

// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers. try catch bhi use kar sakte the iski jagah
import asyncHandler from 'express-async-handler';

//async await likhne se hum ye bata rahe hai ki wo promise return karega aur tab tak wait karega jab tak ye chal nhi jaata tab tab aage nhi badhega
//json wla json me convert kar dega
//since we r working with mongodb and everything returns promise so async await use karna hoga
//so basically it will fetch all products from route api/products
router.get(
  // server.js me hum app.use likhte hai isliye yahan api/product/ likhne ki zarurat nhi padi khali / se kaam chal gya
  '/',
  asyncHandler(async (req, res) => {
    // empty object in find gives us everything
    const products = await Product.find({});
    res.json(products);
  })
);

//ab hum single json object display karne ke liye route likhenge
//products.find products page me saari ids scan karega aur jo bhi id humne api/products/:id me jo id  pass kari hai agar isse match karegi to api/products/:id iss route pe us id ka data show kar dega
//so basically it will fetch all products from route api/products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      // pehle ye kiya tha uske baad apn a ek error handler bana liya
      // res.status(404).json({ message: 'product not found' });
      res.status(404);
      throw new Error('product not found');
    }
  })
);

export default router;
*/

//pehle aisa tha jab products page se data le rhe the baad me database se data lene ke baad change kar dia
//json wla json me convert kar dega
//res.json is like res.send
// app.get('/api/products', (req, res) => {
//     res.json(products);
//   });

//ab hum single json object display karne ke liye route likhenge
//products.find products page me saari ids scan karega aur jo bhi id humne api/products/:id me jo id  pass kari hai agar isse match karegi to api/products/:id iss route pe us id ka data show kar dega
//   app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
//   });
