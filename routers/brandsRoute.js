import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getBrandCtrl,
  getBrandsCtrl,
  updateBrandCtrl,
} from "../controllers/brandsCtrl.js";

const brandsRoutes = express.Router();

brandsRoutes.post("/", isLoggedIn, createBrandCtrl);
brandsRoutes.get("/", getBrandsCtrl);
brandsRoutes.get("/:id", getBrandCtrl);
brandsRoutes.put("/:id/update", isLoggedIn, updateBrandCtrl);
brandsRoutes.delete("/:id/delete", isLoggedIn, deleteBrandCtrl);

export default brandsRoutes;
