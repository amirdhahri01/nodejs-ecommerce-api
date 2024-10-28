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
  const categoryFound = Category.findOne({ name });
  if (categoryFound) {
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
