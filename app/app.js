import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routers/usersRoute.js";
import productRoutes from "../routers/productsRoute.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import categoryRoutes from "../routers/categoriesRoute.js";
import brandsRoutes from "../routers/brandsRoute.js";
//db connect
dbConnect();
const app = express();
//pass incoming data
app.use(express.json());
//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories" , categoryRoutes)
app.use("/api/v1/brands" , brandsRoutes)
//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
