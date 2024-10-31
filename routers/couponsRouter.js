import express from "express";
import {
  createCouponCtrl,
  deleteCouponCtrl,
  getCouponCtrl,
  getCouponsCtrl,
  updateCouponCtrl,
} from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponRoutes = express.Router();

couponRoutes.post("/", isLoggedIn, createCouponCtrl);
couponRoutes.get("/", isLoggedIn, getCouponsCtrl);
couponRoutes.get("/:id", isLoggedIn, getCouponCtrl);
couponRoutes.put("/update/:id", isLoggedIn, updateCouponCtrl);
couponRoutes.delete("/delete/:id", isLoggedIn, deleteCouponCtrl);

export default couponRoutes;
