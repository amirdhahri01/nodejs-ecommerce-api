import express from "express"
import { registerUserCtrl } from "../controllers/UsersCtrl.js";

const userRoutes = express.Router();

userRoutes.post("/api/v1/users/register" , registerUserCtrl);

export default userRoutes;