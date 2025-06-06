import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // exit with failure
  }
};
