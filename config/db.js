// connectDB.js
const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    console.log('MONGO_URL:', process.env.MONGO_URL); // Log MONGO_URL
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
