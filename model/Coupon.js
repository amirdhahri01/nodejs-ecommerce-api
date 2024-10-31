import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

//1.check if coupon is expired

CouponSchema.virtual("isExpired").get(function () {
  const coupon = this;
  return coupon.endDate > Date.now();
});

CouponSchema.virtual("daysLeft").get(function () {
  const coupon = this;
  const daysLeft = Math.ceil(
    (Date.now() - coupon.endDate) / (1000 * 60 * 60 * 24)
  );
  return daysLeft + " Days Left";
});

//2.validations middlewares for the date

CouponSchema.pre("validate", function (next) {
  const coupon = this;
  if (coupon.endDate <= coupon.startDate) {
    next(new Error("End date cannot be less than the start date"));
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  const coupon = this;
  if (coupon.startDate < Date.now()) {
    next(new Error("Start date cannot be less than today"));
  }
  next();
});

CouponSchema.pre("validate", function (next) {
  const coupon = this;
  if (coupon.endDate < Date.now()) {
    next(new Error("End date cannot be less than today"));
  }
  next();
});

//3.validations middlewars for the discount

CouponSchema.pre("validate", function (next) {
  const coupon = this;
  if (coupon.star === 0 || coupon.discount > 100) {
    next(new Error("Discount cannot be less than 0 or greater than 100"));
  }
  next();
});

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
