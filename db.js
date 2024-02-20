const mongoose = require('mongoose');
require('dotenv').config()

const startDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Monesh:987654321@gpc.hjimsyw.mongodb.net/?retryWrites=true&w=majority")
    console.log('📦 connected to mongoDB');
  } catch (err) {
    console.error('❌ error connecting to mongoDB:', err.message);
  }
};

const stopDB = async () => {
  try {
    mongoose.disconnect(console.log("Database connection was closed"));
    console.log('📦 disconnected from mongoDB');
  } catch (err) {
    console.error('❌ error disconnecting from mongoDB:', err.message);
  }
};

const isConnected = () => {
    return mongoose.connection.readyState === 1 ? true : false;
}

module.exports = {startDB, stopDB, isConnected};
