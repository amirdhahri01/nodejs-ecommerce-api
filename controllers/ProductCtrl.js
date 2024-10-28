import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

// @desc   Create new product
// @route  POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }
  //create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    price,
    totalQty,
    user: req.userAuthId,
    brand,
  });
  //push the product into category
  //send response
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

// @desc   Get all products
// @route  GET /api/v1/products
// @access Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.json({status:"success" , products})
});
