import express from "express";
import {
  createCouponCtrl,
  getCouponsCtrl,
} from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponRoutes = express.Router();

couponRoutes.post("/", isLoggedIn, createCouponCtrl);
couponRoutes.get("/", isLoggedIn, getCouponsCtrl);

export default couponRoutes;
