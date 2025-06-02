// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    // Reference to the User who is selling this product
    seller: {
        type: mongoose.Schema.Types.ObjectId, // This field will store a MongoDB ObjectId
        ref: 'User', // This tells Mongoose that this ObjectId refers to a document in the 'User' collection
        required: [true, 'Seller is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;