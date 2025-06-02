// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product'); // Import the Product model
const asyncHandler = require('./utils/asyncHandler'); // Import the utility

const router = express.Router();

// Note: The asyncHandler utility is still needed.
// I'll assume you have a utils/asyncHandler.js or include it directly here for completeness.
// If you're using a separate utils/asyncHandler.js, you'd require it like this.
// If not, you can paste the function directly into this file:
/*
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
*/

// 1. GET all products (optionally filter by seller)
// GET /api/products or /api/products?seller=USER_ID
router.get('/', asyncHandler(async (req, res) => {
    const { seller } = req.query; // Check for a seller ID in the query parameters

    let query = {};
    if (seller) {
        query.seller = seller; // Add seller filter if present
    }

    // .populate('seller') will fetch the actual user document that the seller ID refers to,
    // and include it in the response. You can specify which fields to include/exclude.
    const products = await Product.find(query).populate('seller', 'name email');
    res.status(200).json(products);
}));

// 2. GET a single product by ID
// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json(product);
}));

// 3. POST (Create) a new product
// POST /api/products
router.post('/', asyncHandler(async (req, res) => {
    // Ensure the request body includes a 'seller' field with a valid User ID
    const { name, description, price, seller } = req.body;

    if (!seller) {
        const error = new Error('Seller ID is required to create a product.');
        error.statusCode = 400; // Bad Request
        throw error;
    }

    const newProduct = new Product({ name, description, price, seller });
    const savedProduct = await newProduct.save();
    // Populate seller info in the response, but only after saving, to avoid errors if seller ID is bad
    const populatedProduct = await Product.findById(savedProduct._id).populate('seller', 'name email');
    res.status(201).json(populatedProduct);
}));

// 4. PUT (Update) an existing product by ID
// PUT /api/products/:id
router.put('/:id', asyncHandler(async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).populate('seller', 'name email');

    if (!updatedProduct) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json(updatedProduct);
}));

// 5. DELETE a product by ID
// DELETE /api/products/:id
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
}));

module.exports = router;