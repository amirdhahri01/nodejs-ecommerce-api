import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";

//Stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

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
  //3.check if user has shipping address
  if (user?.hasShippingAddress === false) {
    throw new Error("Please provide shipping address");
  }
  //4.Check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No order items");
  }
  //5.Place/create order - save into DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  //6.Push order into user
  user.orders.push(order?._id);
  //7.Resave
  await user.save();
  //8.Update the product qty
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
  //9.Make payment(stripe)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hats",
            description: "Best hat",
          },
          unit_amount: 1e3,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send({ url: session.url });
  //10.Payment webhook
  
  //11.Update the user order

  /*res.json({ status: "success", message: "Order created", Order, user });*/
});
