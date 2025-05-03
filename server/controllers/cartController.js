import User from "../models/userModel.js";

//Update User Cart Data : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    // console.log(cartItems, "this is from cart");
    const userId = req.userId;
    // console.log(userId, "this is from user");
    await User.findByIdAndUpdate(userId, { cartItems });
    res.status(201).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
