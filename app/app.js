import dotenv from "dotenv"
dotenv.config()
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routers/usersRoute.js";
//db connect
dbConnect();
const app = express();

//routes

app.use("/" , userRoutes);

export default app;