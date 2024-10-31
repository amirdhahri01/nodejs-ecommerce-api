import express from "express";
import {
  createOrderCtrl,
  getAllOrdersCtrl,
} from "../controllers/ordersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrderCtrl);
orderRoutes.get("/", isLoggedIn, getAllOrdersCtrl);

export default orderRoutes;
