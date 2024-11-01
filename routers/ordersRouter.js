import express from "express";
import {
  createOrderCtrl,
  getOrderCtrl,
  getOrdersCtrl,
  getSalesSumCtrl,
  updateOrderCtrl,
} from "../controllers/ordersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrderCtrl);
orderRoutes.get("/", isLoggedIn, getOrdersCtrl);
orderRoutes.get("/:id", isLoggedIn, getOrderCtrl);
orderRoutes.get("/sales/sum",isLoggedIn,getSalesSumCtrl);
orderRoutes.put("/update/:id", isLoggedIn, updateOrderCtrl);

export default orderRoutes;
