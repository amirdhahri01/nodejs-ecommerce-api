import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getBrandCtrl,
  getBrandsCtrl,
  updateBrandCtrl,
} from "../controllers/brandsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandRoutes.get("/", getBrandsCtrl);
brandRoutes.get("/:id", getBrandCtrl);
brandRoutes.put("/update/:id", isLoggedIn, isAdmin, updateBrandCtrl);
brandRoutes.delete("/delete/:id", isLoggedIn, isAdmin, deleteBrandCtrl);

export default brandRoutes;
