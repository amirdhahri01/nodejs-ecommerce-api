import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import Coupon from "../model/Coupon.js";

//Stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

/**
 * @description Create orders
 * @route   POST /api/v1/orders
 * @access  Private
 */

export const createOrderCtrl = asyncHandler(async (req, res) => {
  //1.Get the coupon
  // const { coupon } = req.query;
  // const coupondFound = await Coupon.findOne({ code: coupon?.toUpperCase() });
  // if (coupondFound?.isExpired) {
  //   throw new Error("Coupon has expired");
  // }
  // if (!coupondFound) {
  //   throw new Error("Coupon doesn't exists");
  // }
  //2.Get discount
  // const discount = coupondFound?.discount / 100;
  //2.Get the payload(customer(user),orderItems,shippingAddress,totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  //3.Find the user
  const user = await User.findById(req.userAuthId);
  //4.check if user has shipping address
  if (user?.hasShippingAddress === false) {
    throw new Error("Please provide shipping address");
  }
  //5.Check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No order items");
  }
  //6.Place/create order - save into DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
    // totalPrice: coupondFound ? totalPrice - totalPrice * discount : totalPrice,
  });
  //7.Push order into user
  user.orders.push(order?._id);
  //8.Resave
  await user.save();
  //9.Update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems?.map(async (order) => {
    const product = products?.find(
      (product) => product?._id.toString() === order?._id.toString()
    );
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });
  //10.Convert order items to have same structure that stripe need
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });
  //11.Make payment(stripe)
  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderID: order?._id.toString(),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send({ url: session.url });
});

/**
 * @description Get all orders
 * @route   GET /api/v1/orders
 * @access  Private
 */

export const getOrdersCtrl = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json({
    status: "success",
    message: "Orders fetched successfully",
    orders,
  });
});

/**
 * @description Get single order
 * @route   GET /api/v1/orders/:id
 * @access  Private/admin
 */

export const getOrderCtrl = asyncHandler(async (req, res) => {
  const orderID = req.params.id;
  const order = await Order.findById(orderID);
  res.json({ status: "success", message: "Order fetched successfully", order });
});

/**
 * @description Get orders stats
 * @route   GET /api/v1/orders/sales/stats
 * @access  Private/admin
 */

export const getOrdersStatsCtrl = asyncHandler(async (req, res) => {
  //1.statistics of sales
  const statistics = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalPrice" },
        minimumSale: { $min: "$totalPrice" },
        maximumSale: { $max: "$totalPrice" },
        avgSales: { $avg: "$totalPrice" },
      },
    },
  ]);
  //2.get saleToday
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  //.send response
  res.status(200).json({
    status: "success",
    message: "Orders statistics",
    statistics,
    saleToday,
  });
});

/**
 * @description Update order to delivered
 * @route   PUT /api/v1/orders/update/:id
 * @access  Private/admin
 */

export const updateOrderCtrl = asyncHandler(async (req, res) => {
  const orderID = req.params.id;
  const updatedOrder = await Order.findByIdAndUpdate(
    orderID,
    { status: req.body.status },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Order updated successfully",
    updatedOrder,
  });
});
