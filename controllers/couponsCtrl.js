import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";

/**
 * @description Create new coupon
 * @route   POST /api/v1/coupons
 * @access  Private/Admin
 */

export const createCouponCtrl = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  //1.check if admin
  //2.check if coupon already exists
  const couponExists = await Coupon.findOne({
    code,
  });
  if (couponExists) {
    throw new Error("Coupon already exists");
  }
  //3.check if discount is a number
  if (isNaN(discount)) {
    throw new Error("Discount value must be a number");
  }
  //4.create the coupon
  const coupon = await Coupon.create({
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
    code
  });
  //5.send the reponse
  res.status(201).json({
    status: "success",
    message: "Coupon ceated successfully",
    coupon,
  });
});
