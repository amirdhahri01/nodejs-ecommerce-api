import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createColorCtrl,
  deleteColorCtrl,
  getColorCtrl,
  getColorsCtrl,
  updateColorCtrl,
} from "../controllers/colorsCtrl.js";

const colorRoutes = express.Router();

colorRoutes.post("/", isLoggedIn, createColorCtrl);
colorRoutes.get("/", getColorsCtrl);
colorRoutes.get("/:id", getColorCtrl);
colorRoutes.put("/:id/update", isLoggedIn, updateColorCtrl);
colorRoutes.delete("/:id/delete", isLoggedIn, deleteColorCtrl);

export default colorRoutes;
