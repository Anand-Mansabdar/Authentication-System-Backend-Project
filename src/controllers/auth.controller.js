import userModel from "../models/user.model.js";
import crypto from "crypto";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Missing Required Fields",
    });
  }

  const isUserRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserRegistered) {
    return res.status(409).json({
      message: "User already registered",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    config.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return res.status(201).json({
    message: "User registered successfully",
    User_Details: {
      Username: newUser.username,
      Email: newUser.email,
    },
    token,
  });
};
