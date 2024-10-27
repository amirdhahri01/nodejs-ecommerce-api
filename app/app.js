import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routers/usersRoute.js";
import { globalErrHandler } from "../middlewares/globalErrHandler.js";
//db connect
dbConnect();
const app = express();
//pass incoming data
app.use(express.json());
//routes
app.use("/", userRoutes);
//err middleware
app.use(globalErrHandler);
export default app;
