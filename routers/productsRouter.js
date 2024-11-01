import express from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
  getProductsCtrl,
  updateProductCtrl,
} from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, isAdmin , upload.array("files"), createProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.get("/:id", getProductCtrl);
productRoutes.put("/update/:id", isLoggedIn, updateProductCtrl);
productRoutes.delete("/delete/:id", isLoggedIn, deleteProductCtrl);

export default productRoutes;
