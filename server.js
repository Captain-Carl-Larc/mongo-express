// Importing required modules
const connectDB = require('./config/db');
const express = require('express');
const userRoutes = require('./routes/userRoutes');

//initializing express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/users', userRoutes); // Use user routes for /api/users endpoint

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
