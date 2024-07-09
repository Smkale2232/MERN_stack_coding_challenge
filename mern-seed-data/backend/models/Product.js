const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    title: { type: String, required: true, default: 'No Title' },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true, default: 'No Description' },
    category: { type: String, required: true, default: 'Uncategorized' },
    image: { type: String, required: true, default: 'No Image' },
    sold: { type: Boolean, required: true, default: false },
    dateOfSale: { type: Date, required: true, default: Date.now },
    quantity: { type: Number, required: true, default: 0 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
