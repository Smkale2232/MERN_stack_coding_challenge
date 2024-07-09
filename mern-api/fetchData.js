import mongoose from 'mongoose';
import fetch from 'node-fetch';
import connectDB from './config/db.js';
import Transaction from './models/transaction.js';

const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

const fetchAndStoreData = async () => {
  await connectDB();

  try {
    const response = await fetch(url);
    const data = await response.json();

    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(data);

    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  } finally {
    mongoose.connection.close();
  }
};

fetchAndStoreData();