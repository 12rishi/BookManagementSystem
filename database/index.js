const mongoose = require("mongoose");
const dbConString =
  "mongodb+srv://rishi:ilovecoding@cluster0.1pk7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectMongoose = async () => {
  await mongoose.connect(dbConString);
  console.log("connected successfully");
};
module.exports = connectMongoose;
