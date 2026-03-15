import { Router } from "express";
import {
  getMe,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.get("/get-me", getMe);
authRouter.get("/refresh-token", refreshToken);

export default authRouter;
