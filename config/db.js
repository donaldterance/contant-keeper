import mongoose from 'mongoose';
//import config from 'config';
import dotenv from 'dotenv';
dotenv.config();
const db = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(db);
    console.log(`Database connected...`);
  } catch (e) {
    console.error(`Can not connect: ${e.message}`);
    process.exit(1);
  }
};

export default connectDB;
