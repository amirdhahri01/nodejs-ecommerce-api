import express from "express";
import {
  createOrderCtrl,
  getOrderCtrl,
  getOrdersCtrl,
  getOrdersStatsCtrl,
  updateOrderCtrl,
} from "../controllers/ordersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrderCtrl);
orderRoutes.get("/", isLoggedIn, getOrdersCtrl);
orderRoutes.get("/:id", isLoggedIn, getOrderCtrl);
orderRoutes.get("/sales/stats",isLoggedIn,isAdmin,getOrdersStatsCtrl);
orderRoutes.put("/update/:id", isLoggedIn, updateOrderCtrl);

export default orderRoutes;
