//kai cheeze jo comment karta hu mai uska ye bhi matlab hota hai ki pehle ye likha tha baad me changes kar diye jaise jaise naye naye concepts ate gye aage ki videos me
// const express = require('express');

// const products = require('./data/products');
// const dotenv = require('dotenv');

//after changing script and using es module in node(video 6)
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

connectDB();

dotenv.config();

const app = express();

//in video 2 of authentication
//it will allow us to accept json data in the body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('api is running....');
});

//inhi ki wajah se productroutes aur userroutes wle pages me /api/product/users/login poora nhi likhna padta
//it means anything that will be linked to /api/products will be directed to productRoutes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//in video 9 of mongodb custom error handling ye app.use wla code
app.use(notFound);

//in video 9 of mongodb custom error handling ye app.use wla code
app.use(errorHandler);

const PORT = process.env.port || 5000;

app.listen(
  PORT,
  console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
