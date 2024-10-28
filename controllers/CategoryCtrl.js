import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

/**
 * @description create new category
 * @route POST /api/v1/categories
 * @access Private/Admin
 */

export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //category exists
  const categoryExists = await Category.findOne({ name: name.toLowerCase() });
  if (categoryExists) {
    throw new Error("Category already exists");
  }
  //create category
  const category = await Category.create({
    name,
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

/**
 * @description Get all categories
 * @route GET /api/v1/categories
 * @access Public
 */

export const getCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "success",
    message: "Categories fetched successfully",
    categories,
  });
});

/**
 * @description Get single category
 * @route GET /api/v1/categories/:id
 * @access Public
 */

export const getCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

/**
 * @description Update category
 * @route PUT /api/v1/categories/:id/update
 * @access Private/Admin
 */

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Category updated successfully",
    category,
  });
});

/**
 * @description Delete category
 * @route DELETE /api/v1/categories/:id/update
 * @access Private/Admin
 */

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.json({
    status: "success",
    message: "Category deleted successfully",
    category,
  });
});
