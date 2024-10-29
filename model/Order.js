import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Generate random numbers for order

const randomTxt = Math.random().toString(36).substring(7).toUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },
    //For stripe payment
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    //For admin
    status: {
      type: String,
      defautl: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

//Complie to form model

const Order = mongoose.model("Order", OrderSchema);

export default Order;
