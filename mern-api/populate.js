import mongoose from 'mongoose';
import Transaction from './models/transaction.js';
import connectDB from './config/db.js';

const transactions = [
  { title: 'Product 1', description: 'Description 1', price: 10, dateOfSale: new Date('2023-01-15') },
  { title: 'Product 2', description: 'Description 2', price: 20, dateOfSale: new Date('2023-02-20') },
  { title: 'Product 3', description: 'Description 3', price: 30, dateOfSale: new Date('2023-03-25') },
  // Add more transactions as needed
];

const populateDB = async () => {
  await connectDB();

  try {
    await Transaction.insertMany(transactions);
    console.log('Sample transactions added');
  } catch (err) {
    console.error('Error adding transactions:', err);
  } finally {
    mongoose.connection.close();
  }
};

populateDB();