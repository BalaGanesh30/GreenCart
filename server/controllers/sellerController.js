import Seller from "../models/sellerModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/authToken.js";

// Seller Register: POST /api/seller/register
export const registerSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "this seller");
    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res
        .status(400)
        .json({ success: false, message: "Seller already exists" });
    }

    // Hash the password manually using bcrypt
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new seller with the hashed password
    const newSeller = new Seller({
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new seller to the database
    await newSeller.save();

    // Generate token for the seller
    const token = generateToken(email);

    // Send a response with the token and success message
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ success: true, message: "Seller registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller Login: POST /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Generate a token if credentials are correct
    const token = generateToken(email);

    // Set token in cookie and send success response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ success: true, message: "Logged In" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller Auth Check: GET /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    const userId = req.userId;
    const seller = await Seller.findOne({ email: userId });
    if (!seller) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller Logout: GET /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .status(200)
      .json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
