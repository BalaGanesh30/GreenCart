import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/GreenCart`);
    console.log("Database Connected");

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Optional: Stop server if DB fails to connect
  }
};

export default connectDB;
