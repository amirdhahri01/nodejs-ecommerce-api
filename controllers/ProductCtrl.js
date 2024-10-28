import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

// @desc   Create new product
// @route  POST /api/v1/products
// @access Private/Admin

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, user, price, totalQty } =
    req.body;
  
});
