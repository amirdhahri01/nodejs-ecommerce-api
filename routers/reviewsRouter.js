import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReviewCtrl, getReviewsCtrl } from "../controllers/reviewsCtrl.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/:productID" ,isLoggedIn, createReviewCtrl);
reviewRoutes.get("/:productID" , isLoggedIn , getReviewsCtrl)

export default reviewRoutes