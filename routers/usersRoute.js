import express from "express";
import {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
} from "../controllers/UsersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);

export default userRoutes;
