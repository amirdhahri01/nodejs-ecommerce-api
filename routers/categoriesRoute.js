import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getCategoriesCtrl,
  getCategoryCtrl,
  updateCategoryCtrl,
} from "../controllers/CategoryCtrl.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", isLoggedIn, createCategoryCtrl);
categoryRoutes.get("/", getCategoriesCtrl);
categoryRoutes.get("/:id", getCategoryCtrl);
categoryRoutes.put("/:id/update", isLoggedIn, updateCategoryCtrl);
categoryRoutes.delete("/:id/delete", isLoggedIn, deleteCategoryCtrl);

export default categoryRoutes;
