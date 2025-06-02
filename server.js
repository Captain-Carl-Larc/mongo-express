// Importing required modules
const connectDB = require('./config/db');
const express = require('express');

//initializing express app
const app = express();

// Connect to the database
connectDB();

