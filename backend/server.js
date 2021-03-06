
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

app.use(express.json());

app.get('/', (req, res) => {
  res.send('api is running....');
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.port || 5000;

app.listen(
  PORT,
  console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
