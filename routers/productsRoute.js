import express from "express";
import {
  createProductCtrl,
  getProductCtrl,
  getProductsCtrl,
} from "../controllers/ProductCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.get("/:id",getProductCtrl)
export default productRoutes;
