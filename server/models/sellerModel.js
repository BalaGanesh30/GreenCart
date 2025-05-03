import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema for the seller
const sellerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Converts email to lowercase before saving
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensures the password is at least 6 characters long
    },
    // You can add more fields like name, phone number, etc., as needed
    // name: { type: String },
    // phone: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Seller model based on the schema
const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
