import Product from "../model/Product.js";
import Review from "../model/Review.js";
import asyncHandler from "express-async-handler";

/**
 * @description Create new review
 * @route POST api/v1/reviews/:productID"
 * @access Private/Admin
 */

export const createReviewCtrl = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  //1. Find the product
  const { productID } = req.params;
  const productFound = await Product.findById(productID).populate("reviews");
  if (!productFound) {
    throw new Error("Product Not Found");
  } 
  //2. Check if user already reviewed this product
  const hasReviewed = productFound?.reviews?.find(
    (review) => (review.user.toString() === req.userAuthId.toString())
  );
  if(hasReviewed){
    throw new Error("You have already reviewed this product")
  }
  //3. Create new review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });
  //4. Push review into product found
  productFound.reviews.push(review?._id);
  //5. Resave
  await productFound.save();
  //6. Send the response
  res.status(201).json({
    status: "success",
    message: "Review created successfully",
  });
});
