import express from "express";
import { createOrdersCtrl } from "../controllers/ordersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrdersCtrl);

export default orderRoutes;
