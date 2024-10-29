import Order from "../model/Order.js"
import asyncHandler from "express-async-handler"

/**
 * @description create orders
 * @route   POST /api/v1/orders
 * @access  Private/Admin
 */

export const createOrdersCtrl = asyncHandler(async (req , res)=>{
    res.json({
        message:"Order Ctrl"
    })
})