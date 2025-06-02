// models/User.js
const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the model using module.exports
module.exports = User;