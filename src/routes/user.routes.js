import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutAllUsers,
  logoutUser,
  refreshToken,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/get-me", getMe);
authRouter.get("/refresh-token", refreshToken);
authRouter.get("/logout", logoutUser);
authRouter.get("/logout-all", logoutAllUsers);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
