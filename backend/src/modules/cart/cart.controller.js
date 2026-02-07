const asyncHandler = require("../../utils/asyncHandler");
const cartService = require("./cart.service");

exports.addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addItemToCart(req.body);

  res.json({
    success: true,
    message: "Item added to cart",
    data: cart
  });
});

exports.getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart();

  res.json({
    success: true,
    data: cart
  });
});

exports.updateQuantity = asyncHandler(async (req, res) => {
  const cart = await cartService.updateQuantity(
    req.params.productId,
    req.body.quantity
  );

  res.json({
    success: true,
    message: "Quantity updated",
    data: cart
  });
});

exports.removeItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeItem(req.params.productId);

  res.json({
    success: true,
    message: "Item removed",
    data: cart
  });
});
