// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // No .js extension needed

const router = express.Router(); // Create an Express router

// Async handler wrapper to reduce try-catch blocks in routes
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// 1. GET all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}));

// 2. GET a single user by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json(user);
}));

// 3. POST (Create) a new user
router.post('/', asyncHandler(async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}));

// 4. PUT (Update) an existing user by ID
router.put('/:id', asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json(updatedUser);
}));

// 5. DELETE a user by ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ message: 'User deleted successfully' });
}));

// Export the router using module.exports
module.exports = router;