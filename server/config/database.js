import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose.set("debug", true);
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

export default connectDB;