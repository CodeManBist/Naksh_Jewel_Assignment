const asyncHandler = require("../../utils/asyncHandler");
const productService = require("./product.service");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();

  res.json({
    success: true,
    data: products,
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});
