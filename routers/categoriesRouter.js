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

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/",
  isLoggedIn,
  categoryFileUpload.single("file"),
  createCategoryCtrl
);
categoryRoutes.get("/", getCategoriesCtrl);
categoryRoutes.get("/:id", getCategoryCtrl);
categoryRoutes.put("/update/:id", isLoggedIn, updateCategoryCtrl);
categoryRoutes.delete("/delete/:id", isLoggedIn, deleteCategoryCtrl);

export default categoryRoutes;
