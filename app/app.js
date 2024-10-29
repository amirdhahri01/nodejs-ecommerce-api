import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routers/usersRouter.js";
import productRoutes from "../routers/productsRouter.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import categoryRoutes from "../routers/categoriesRouter.js";
import brandsRoutes from "../routers/brandsRouter.js";
import colorsRoutes from "../routers/colorsRouter.js";
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
app.use("/api/v1/colors" , colorsRoutes)
//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
