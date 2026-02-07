const Product = require("./product.model");

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

module.exports = {
  getAllProducts,
  getProductById,
};
