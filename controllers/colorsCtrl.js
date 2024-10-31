import Color from "../model/Color.js";
import asyncHandler from "express-async-handler";

/**
 * @description Create new color
 * @route POST /api/v1/colors
 * @access Private/Admin
 */

export const createColorCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //Color exists
  const colorExists = await Color.findOne({ name: name.toLowerCase() });
  if (colorExists) {
    throw new Error("Color already exists");
  }
  //create Color
  const color = await Color.create({
    name,
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Color created successfully",
    color,
  });
});

/**
 * @description Get all Colors
 * @route GET /api/v1/colors
 * @access Public
 */

export const getColorsCtrl = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: "success",
    message: "Colors fetched successfully",
    colors,
  });
});

/**
 * @description Get single color
 * @route GET /api/v1/Colors/:id
 * @access Public
 */

export const getColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: "success",
    message: "Color fetched successfully",
    color,
  });
});

/**
 * @description Update color
 * @route PUT /api/v1/colors/update/:id
 * @access Private/Admin
 */

export const updateColorCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Color updated successfully",
    color,
  });
});

/**
 * @description Delete color
 * @route DELETE /api/v1/colors/:id/update
 * @access Private/Admin
 */

export const deleteColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.json({
    status: "success",
    message: "Color deleted successfully",
    color,
  });
});
