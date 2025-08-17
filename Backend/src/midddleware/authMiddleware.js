const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userMiddleWare = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Token is not present");

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = payload;

    if (!_id) throw new Error("Invalid token");

    const result = await User.findById(_id);
    if (!result) throw new Error("User doesn't exist");
    req.result=_id;
    req.user = result; // changed to `user` for standard naming
    next();
  } catch (err) {
    console.error("JWT middleware error:", err.message);
    return res.status(403).json({ error: "Token invalid or expired. Please log in again." });
  }
};

module.exports = userMiddleWare;
