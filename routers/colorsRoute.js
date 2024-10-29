import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createColorCtrl,
  deleteColorCtrl,
  getColorCtrl,
  getColorsCtrl,
  updateColorCtrl,
} from "../controllers/colorsCtrl.js";

const colorsRoutes = express.Router();

colorsRoutes.post("/", isLoggedIn, createColorCtrl);
colorsRoutes.get("/", getColorsCtrl);
colorsRoutes.get("/:id", getColorCtrl);
colorsRoutes.put("/:id/update", isLoggedIn, updateColorCtrl);
colorsRoutes.delete("/:id/delete", isLoggedIn, deleteColorCtrl);

export default colorsRoutes;
