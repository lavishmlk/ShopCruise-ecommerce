import mongoose from 'mongoose';
import dotenv from 'dotenv';
//mongoose hamesha promises return karta hai isliye async await use karna zaruri hai
dotenv.config();
const connectDB = async () => {
  try {
    // process.env.MONGO_URI iska url .env wli file me likha hau isliye .env wli file bhi import karni padti hai
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
