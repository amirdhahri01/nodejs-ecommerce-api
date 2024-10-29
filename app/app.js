import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routers/usersRouter.js";
import productRoutes from "../routers/productsRouter.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import categoryRoutes from "../routers/categoriesRouter.js";
import brandRoutes from "../routers/brandsRouter.js";
import colorRoutes from "../routers/colorsRouter.js";
import reviewRoutes from "../routers/reviewsRouter.js";
//db connect
dbConnect();
const app = express();
//pass incoming data
app.use(express.json());
//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories" , categoryRoutes)
app.use("/api/v1/brands" , brandRoutes)
app.use("/api/v1/colors" , colorRoutes)
app.use("/api/v1/reviews" , reviewRoutes)
//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
