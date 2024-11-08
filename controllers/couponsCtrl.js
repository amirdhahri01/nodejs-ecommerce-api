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
    code: code?.toUpperCase(),
  });
  //5.send the reponse
  res.status(201).json({
    status: "success",
    message: "Coupon ceated successfully",
    coupon,
  });
});

/**
 * @description Get coupons
 * @route   GET /api/v1/coupons
 * @access  Private/Admin
 */

export const getCouponsCtrl = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.json({
    statuc: "success",
    message: "Coupons fetchead successfully",
    coupons,
  });
});

/**
 * @description Get coupon
 * @route   GET /api/v1/coupons/:id
 * @access  Private/Admin
 */

export const getCouponCtrl = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.query.code });
  //check if is not found
  if (!coupon) {
    throw new Error("Coupon not found.");
  }
  //check id expired
  if (coupon.isExpired) {
    throw new Error("Coupon Expired.");
  }
  res.json({
    status: "success",
    messge: "Coupon fetched successfully",
    coupon,
  });
});

/**
 * @description Update coupon
 * @route   PUT /api/v1/coupons/update/:id
 * @access  Private/Admin
 */

export const updateCouponCtrl = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const couponID = req.params.id;
  const coupon = await Coupon.findByIdAndUpdate(
    couponID,
    {
      code,
      startDate,
      endDate,
      discount,
    },
    { new: true }
  );
  res.json({
    status: "success",
    messge: "Coupon updated successfully",
    coupon,
  });
});

/**
 * @description Delete coupon
 * @route   DELETE /api/v1/coupons/delete/:id
 * @access  Private/Admin
 */

export const deleteCouponCtrl = asyncHandler(async (req, res) => {
  const couponID = req.params.id;
  const coupon = await Coupon.findByIdAndDelete(couponID);
  res.json({
    status: "success",
    messge: "Coupon deleted successfully",
    coupon,
  });
});
