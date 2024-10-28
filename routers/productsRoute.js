import express from "express";
import {
  createProductCtrl,
  getProductCtrl,
  getProductsCtrl,
  updateProductCtrl,
} from "../controllers/ProductCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.get("/:id",getProductCtrl)
productRoutes.put("/:id/update",isLoggedIn,updateProductCtrl)
export default productRoutes;
