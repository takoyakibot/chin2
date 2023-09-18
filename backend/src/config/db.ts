import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chin2');
    console.log('Connected to MongoDB via Mongoose');
  } catch (err) {
    console.error('Error:', err);
  }
};

const getDB = () => {
  if (!mongoose.connection.readyState) {
    throw new Error('You must connect to the database first');
  }
  return mongoose;
};

export { connectDB, getDB };
