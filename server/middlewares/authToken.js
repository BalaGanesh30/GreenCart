import jwt from "jsonwebtoken";

export const generateToken = (data) => {
  return jwt.sign({ id: data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const authenticateToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ Attach to `req` directly
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
