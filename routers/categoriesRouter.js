import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getCategoriesCtrl,
  getCategoryCtrl,
  updateCategoryCtrl,
} from "../controllers/categoriesCtrl.js";
import categoryFileUpload from "../config/categoryUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/",
  isLoggedIn,
  isAdmin,
  categoryFileUpload.single("file"),
  createCategoryCtrl
);
categoryRoutes.get("/", getCategoriesCtrl);
categoryRoutes.get("/:id", getCategoryCtrl);
categoryRoutes.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  categoryFileUpload.single("file"),
  updateCategoryCtrl
);
categoryRoutes.delete("/delete/:id", isLoggedIn, isAdmin, deleteCategoryCtrl);

export default categoryRoutes;
