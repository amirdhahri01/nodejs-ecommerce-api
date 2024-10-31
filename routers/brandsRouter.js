import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getBrandCtrl,
  getBrandsCtrl,
  updateBrandCtrl,
} from "../controllers/brandsCtrl.js";

const brandRoutes = express.Router();

brandRoutes.post("/", isLoggedIn, createBrandCtrl);
brandRoutes.get("/", getBrandsCtrl);
brandRoutes.get("/:id", getBrandCtrl);
brandRoutes.put("/update/:id", isLoggedIn, updateBrandCtrl);
brandRoutes.delete("/delete/:id", isLoggedIn, deleteBrandCtrl);

export default brandRoutes;
