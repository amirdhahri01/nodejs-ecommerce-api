import express from "express";
import {
  createOrderCtrl,
  getOrderCtrl,
  getOrdersCtrl,
  getOrdersStatsCtrl,
  updateOrderCtrl,
} from "../controllers/ordersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrderCtrl);
orderRoutes.get("/", isLoggedIn, getOrdersCtrl);
orderRoutes.get("/:id", isLoggedIn, getOrderCtrl);
orderRoutes.get("/sales/stats",isLoggedIn,getOrdersStatsCtrl);
orderRoutes.put("/update/:id", isLoggedIn, updateOrderCtrl);

export default orderRoutes;
