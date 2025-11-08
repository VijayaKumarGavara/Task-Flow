import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/PlannerDB"; // use 127.0.0.1 for consistency

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error while connecting DB:", error.message);
    process.exit(1); // Exit process if DB fails to connect
  }
}

export default connectDB;
