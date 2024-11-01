import express from "express";
import {
  createCouponCtrl,
  deleteCouponCtrl,
  getCouponCtrl,
  getCouponsCtrl,
  updateCouponCtrl,
} from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRoutes = express.Router();

couponRoutes.post("/", isLoggedIn, isAdmin, createCouponCtrl);
couponRoutes.get("/", isLoggedIn, getCouponsCtrl);
couponRoutes.get("/:id", isLoggedIn, getCouponCtrl);
couponRoutes.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);
couponRoutes.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponCtrl);

export default couponRoutes;
