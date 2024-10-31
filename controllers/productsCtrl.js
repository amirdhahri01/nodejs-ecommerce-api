import Brand from "../model/Brand.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

/**
 * @description  Create new product
 * @route  POST /api/v1/products
 * @access Private/Admin
 */

export const createProductCtrl = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  //Product exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }
  //find the category
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
  }
  //find the category
  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) {
    throw new Error(
      "Brand not found, please create brand first or check brand name"
    );
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
  categoryFound.products.push(product._id);
  //resave
  await categoryFound.save();
  //push the product into brand
  brandFound.products.push(product._id);
  //resave
  await brandFound.save();
  //send response
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

/**
 *@description Get all products
 *@route  GET /api/v1/products
 *@access Public
 */

export const getProductsCtrl = asyncHandler(async (req, res) => {
  //query
  let productQuery = Product.find();

  //search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //filter by color
  if (req.query.color) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.color, $options: "i" },
    });
  }

  //filter by size
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }

  //filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    //gte : greater or equal
    //lte : less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startIdx = (page - 1) * limit;
  //endIdx
  const endIdx = page * limit;
  //total
  const total = await Product.countDocuments();
  productQuery = productQuery.skip(startIdx).limit(limit);

  //pagination results
  const pagination = {};
  if (endIdx < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIdx > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the query
  const products = await productQuery.populate("reviews");
  res.json({
    status: "success",
    results: products.length,
    pagination,
    message: "Products fetched successfully",
    products,
  });
});

/**
 * @description Get single product
 * @route GET /api/v1/products/:id
 * @access Public
 */

export const getProductCtrl = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }
  res.json({
    status: "success",
    message: "Product fetched successfully",
    product,
  });
});

/**
 * @description Update product
 * @route PUT /api/v1/products/update/:id/
 * @access Private/Admin
 */

export const updateProductCtrl = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      price,
      totalQty,
      brand,
    },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Product updated successfully",
    product,
  });
});

/**
 * @description Delete product
 * @route DELETE /api/v1/products/delete/:id/
 * @access Private/Admin
 */

export const deleteProductCtrl = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id, { new: true });
  res.json({
    status: "success",
    message: "Product deleted successfully",
    product,
  });
});
