const express = require("express");
const router = express.Router();

const cartController = require("./cart.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  addToCartSchema,
  updateQuantitySchema
} = require("./cart.validation");

router.get("/", cartController.getCart);

router.post(
  "/",
  validate(addToCartSchema),
  cartController.addToCart
);

router.patch(
  "/:productId",
  validate(updateQuantitySchema),
  cartController.updateQuantity
);

router.delete("/:productId", cartController.removeItem);

module.exports = router;
