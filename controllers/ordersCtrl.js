import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";

/**
 * @description Create orders
 * @route   POST /api/v1/orders
 * @access  Private
 */

export const createOrderCtrl = asyncHandler(async (req, res) => {
  //1.Get the payload(customer(user),orderItems,shippingAddress,totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  //2.Find the user
  const user = await User.findById(req.userAuthId);
  //3.Check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No order items");
  }
  //4.Place/create order - save into DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  //5.Push order into user
  user.orders.push(order?._id);
  //6.Resave
  await user.save();
  //7.Update the product qty
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
  //7.Make payment(stripe)
  //8.Payment webhook
  //9.Update the user order
  res.json({ status: "success", message: "Order created", Order, user });
});
