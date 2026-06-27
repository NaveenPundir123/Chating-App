const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Successfully Connected");
  } catch (error) {
    console.log("Database Connection error", error);
  }
}

module.exports = connectDB;
