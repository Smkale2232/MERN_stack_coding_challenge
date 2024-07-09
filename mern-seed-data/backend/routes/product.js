const express = require('express');
const axios = require('axios');
const Product = require('../models/Product');

const router = express.Router();

router.get('/seed', async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        
        await Product.deleteMany({}); // Clear existing data

        const products = data.map(product => ({
            productId: product.id,
            title: product.title || 'No Title',
            price: product.price || 0,
            description: product.description || 'No Description',
            category: product.category || 'Uncategorized',
            image: product.image || 'No Image',
            sold: product.sold !== undefined ? product.sold : false,
            dateOfSale: product.dateOfSale ? new Date(product.dateOfSale) : new Date(),
            quantity: product.quantity || 0, // Ensure quantity is handled properly
        }));

        console.log('Products to be inserted:', products); // Log products data

        // Insert products individually to catch and log errors for each
        for (const product of products) {
            try {
                await Product.create(product);
            } catch (error) {
                console.error('Error inserting product:', product);
                console.error('Validation error:', error.message);
                if (error.errors) {
                    for (let key in error.errors) {
                        console.error(`Validation error for ${key}: ${error.errors[key].message}`);
                    }
                }
            }
        }

        res.status(201).json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Error seeding database:', error.message);
        if (error.errors) {
            for (let key in error.errors) {
                console.error(`Validation error for ${key}: ${error.errors[key].message}`);
            }
        }
        res.status(500).json({ message: 'Error seeding database', error: error.message });
    }
});

module.exports = router;
