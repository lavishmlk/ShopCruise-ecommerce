
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

//now we will create 2 functions importdata and destroy data
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    //now we want to make 1st user as admin
    const adminUser = await createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      //it means har product ko traverse karega jo product hai wo to aise ka aise hi rahega uske har har product me amdinUser wli field bhi add ho jaegi
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log('data imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('data destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] == '-d') {
  destroyData();
} else {
  importData();
}
