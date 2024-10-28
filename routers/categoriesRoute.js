import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategoryCtrl } from "../controllers/CategoryCtrl.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/categories", isLoggedIn , createCategoryCtrl);

export default categoryRoutes