import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wishLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishList" }],
    isAdmin: {
      type: Boolean,
      required: false,
    },
    hasShippingAddress: {
      type: Boolean,
      required: false,
    },
    shippingAddress: {
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      address: {
        type: "string",
      },
      city: {
        type: "string",
      },
      province: {
        type: "string",
      },
      country: {
        type: "string",
      },
      phone: {
        type: "string",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compile the schema to model
const User = mongoose.model("User", UserSchema);

export default User;
