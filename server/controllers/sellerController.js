import { generateToken } from "../middlewares/authToken.js";

// Seller Login: POST /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = generateToken(email);

      res
        .cookie("sellerToken", token, {
          httpOnly: true,
          secure: true, // Render uses HTTPS
          sameSite: "none", // Required for cross-site cookies
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        .status(200)
        .json({ success: true, message: "Logged In" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller Auth Check: GET /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
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
      .clearCookie("sellerToken", {
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
