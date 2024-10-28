import Brand from "../model/Brand.js"
import asyncHandler from "express-async-handler";

/**
 * @description Create new brand
 * @route POST /api/v1/brands
 * @access Private/Admin
 */

export const createBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //Brand exists
  const brandExists = await Brand.findOne({ name: name.toLowerCase() });
  if (brandExists) {
    throw new Error("Brand already exists");
  }
  //create Brand
  const brand = await Brand.create({
    name,
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

/**
 * @description Get all brands
 * @route GET /api/v1/brands
 * @access Public
 */

export const getBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: "success",
    message: "Brands fetched successfully",
    brands,
  });
});

/**
 * @description Get single brand
 * @route GET /api/v1/brands/:id
 * @access Public
 */

export const getBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: "success",
    message: "Brand fetched successfully",
    brand,
  });
});

/**
 * @description Update brand
 * @route PUT /api/v1/brands/:id/update
 * @access Private/Admin
 */

export const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //update
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Brand updated successfully",
    brand,
  });
});

/**
 * @description Delete brand
 * @route DELETE /api/v1/brands/:id/update
 * @access Private/Admin
 */

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.json({
    status: "success",
    message: "Brand deleted successfully",
    brand,
  });
});
