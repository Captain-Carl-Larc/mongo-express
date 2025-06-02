// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//initializing express app
const app = express();

//configuring dotenv to use environment variables
dotenv.config();


//connecting to MongoDB
const PORT = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});