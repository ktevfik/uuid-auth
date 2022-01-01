const mongoose = require('mongoose');
require('dotenv').config('./.env');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });

    console.log('DB Successfully connected');
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
