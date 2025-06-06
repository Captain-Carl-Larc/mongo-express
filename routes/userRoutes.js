// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // No .js extension needed

const router = express.Router(); // Create an Express router

//get all users
router.get('/',async(req,res)=>{
    try{
        const users = await User.find({}); // Fetch all users with selected fields
        res.status(200).json(users); // Respond with the list of users
    }
    catch{
        console.log('Error fetching users',error); // Log the error
        res.status(500).json({message: 'Error fetching users'}); // Handle errors
    }
})

//find user by ID
router.get('/:id',async(req,res)=>{
    const userId = req.params.id; // Get the user ID from the request parameters

    try {
        const user = await User.find({ _id: userId }, { name: 1, email: 1, age: 1, _id: false })// Fetch user by ID with selected fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }
        console.log('User fetched successfully:', user); // Log the successful fetch
        res.status(200).json(user); // Respond with the user data
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error
        res.status(500).json({ message: 'Error fetching user' }); // Handle errors
    }
})

//create user
router.post('/',async(req,res)=>{
    const { name, email, age } = req.body; // Destructure the request body

    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' }); // Bad Request
    }

    try {
        const newUser = new User({ name, email, age }); // Create a new user instance
        const savedUser = await newUser.save(); // Save the user to the database
        res.status(201).json(savedUser); // Respond with the created user
    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        res.status(500).json({ message: 'Error creating user' }); // Handle errors
    }
})

//update user
router.patch('/:id', async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters
    const { name, email, age } = req.body; // Destructure the request body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, age }, // Fields to update
            { new: true, runValidators: true } // Options to return the updated document and validate
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }

        res.status(200).json(updatedUser); // Respond with the updated user
    } catch (error) {
        console.error('Error updating user:', error); // Log the error
        res.status(500).json({ message: 'Error updating user' }); // Handle errors
    }
});

//delete user by id
router.delete('/:id', async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters

    try {
        const deletedUser = await User.findByIdAndDelete(userId); // Delete the user by ID

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' }); // Not Found
        }

        res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error deleting user:', error); // Log the error
        res.status(500).json({ message: 'Error deleting user' }); // Handle errors
    }
}); // 
// Export the router using module.exports
module.exports = router;