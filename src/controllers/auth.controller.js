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

export const getMe = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  console.log(decoded);

  const user = await userModel.findById(decoded.id);

  return res.status(200).json({
    message: "User fetched successfully",
    User: {
      Username: user.username,
      Email: user.email,
    },
  });
};
