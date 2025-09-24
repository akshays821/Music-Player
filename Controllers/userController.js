import User from '../Models/userModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    // create new user directly from request body
    const user = await User.create(req.body);

    res.status(201).json({
      message: "user registered",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    // 400 = bad request (validation / duplicate email etc)
    res.status(400).json({ error: err.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ error: "user not found" });

    // compare passwords using bcrypt method from model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "invalid credentials" });

    // create token
    const secret = process.env.SECRET;
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    // send single response with token + user info
    res.json({
      message: "login success",
      token,
      user: { id: user._id, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
