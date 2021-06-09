//its a script we can run to import our data such as users,products
//its no way connected to our server its completely seperate
//see seeder video to understand all
//... is spread operator iska use ye hai ki agar for rg ek array hai const array1=[lavish,malik,lmk] to ...array1 linkne se ye array ka sara data return kar dega
//syntax  ...arrayname

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

    //database me data add karne ke liye insertmany use karte hai
    //for adding users to database ye users wo hai jo data folder me humne sample data dala hai
    const createdUsers = await User.insertMany(users);
    //now we want to make 1st user as admin
    const adminUser = await createdUsers[0]._id;

    //for adding products to database jo humne data folder me banaya hai
    //map react me sikha tha aur map ke aage jo product hai wo humne khud naam diya hai matlab as an argument to function
    const sampleProducts = products.map((product) => {
      //it means har product ko traverse karega jo product hai wo to aise ka aise hi rahega uske har har product me amdinUser wli field bhi add ho jaegi
      return { ...product, user: adminUser };
    });

    //ye Product model hai
    //isi line ki wajah se productmodel me humne data pass kiya
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
