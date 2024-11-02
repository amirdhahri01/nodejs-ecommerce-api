import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routers/usersRouter.js";
import productRoutes from "../routers/productsRouter.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import categoryRoutes from "../routers/categoriesRouter.js";
import brandRoutes from "../routers/brandsRouter.js";
import colorRoutes from "../routers/colorsRouter.js";
import reviewRoutes from "../routers/reviewsRouter.js";
import orderRoutes from "../routers/ordersRouter.js";
import Stripe from "stripe";
import Order from "../model/Order.js";
import couponRoutes from "../routers/couponsRouter.js";
//db connect
dbConnect();
const app = express();
//cors
app.use(cors());
//Stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret =
  "whsec_b70e4113e34cb61f85ca930f2cc62e24f484e28598abc9ee693f3a5fef874947";
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(err.message());
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      //Update the order
      const session = event.data.object;
      const { orderID } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      //Find the order
      const order = await Order.findByIdAndUpdate(
        orderID,
        {
          currency,
          paymentMethod,
          paymentStatus,
          totalPrice: totalAmount / 100,
        },
        { new: true }
      );
      console.log(order);
    } else {
      return;
    }
    response.json({ received: true });
  }
);
//Pass incoming data
app.use(express.json());
//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/coupons", couponRoutes);
//Err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
