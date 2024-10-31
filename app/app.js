import dotenv from "dotenv";
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
//db connect
dbConnect();
const app = express();
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
//Stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret = "whsec_...";
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  }
);
app.listen(4242, () => console.log("Running on port 4242"));
//Err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
