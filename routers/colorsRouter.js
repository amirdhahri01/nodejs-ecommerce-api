import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createColorCtrl,
  deleteColorCtrl,
  getColorCtrl,
  getColorsCtrl,
  updateColorCtrl,
} from "../controllers/colorsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorRoutes = express.Router();

colorRoutes.post("/", isLoggedIn, isAdmin, createColorCtrl);
colorRoutes.get("/", getColorsCtrl);
colorRoutes.get("/:id", getColorCtrl);
colorRoutes.put("/update/:id", isLoggedIn, isAdmin, updateColorCtrl);
colorRoutes.delete("/delete/:id", isLoggedIn, isAdmin, deleteColorCtrl);

export default colorRoutes;
