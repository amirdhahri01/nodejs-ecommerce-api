import express from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
  getProductsCtrl,
  updateProductCtrl,
} from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.get("/:id", getProductCtrl);
productRoutes.put("/:id/update", isLoggedIn, updateProductCtrl);
productRoutes.delete("/:id/delete", isLoggedIn, deleteProductCtrl);
export default productRoutes;
