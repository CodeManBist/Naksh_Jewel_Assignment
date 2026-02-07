const Cart = require("./cart.model");
const Product = require("../product/product.model");
const ApiError = require("../../utils/ApiError");

/**
 * Helper – NEVER crashes
 */
const normalizeId = (id) => (id ? id.toString() : null);

/**
 * Always return single cart
 */
const getOrCreateCart = async () => {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [], totalAmount: 0 });
  return cart;
};

/**
 * Add item to cart
 */
const addItemToCart = async ({ productId, quantity }) => {
  if (!productId) throw new ApiError(400, "productId is required");
  if (!quantity || quantity <= 0)
    throw new ApiError(400, "Invalid quantity");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const cart = await getOrCreateCart();

  const existingItem = cart.items.find(
    (item) =>
      normalizeId(item.productId) === normalizeId(productId)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      image: product.image,
      quantity,
      priceAtTime: product.price
    });
  }

  recalcTotal(cart);
  await cart.save();
  return cart;
};

/**
 * Get cart
 */
const getCart = async () => {
  return await getOrCreateCart();
};

/**
 * Update quantity
 */
const updateQuantity = async (productId, quantity) => {
  if (!productId) throw new ApiError(400, "productId missing");
  if (!quantity || quantity <= 0)
    throw new ApiError(400, "Quantity must be > 0");

  const cart = await getOrCreateCart();

  const item = cart.items.find(
    (item) =>
      normalizeId(item.productId) === normalizeId(productId)
  );

  if (!item) throw new ApiError(404, "Item not in cart");

  item.quantity = quantity;

  recalcTotal(cart);
  await cart.save();
  return cart;
};

/**
 * Remove item
 */
const removeItem = async (productId) => {
  if (!productId) throw new ApiError(400, "productId missing");

  const cart = await getOrCreateCart();

  cart.items = cart.items.filter(
    (item) =>
      normalizeId(item.productId) !== normalizeId(productId)
  );

  recalcTotal(cart);
  await cart.save();
  return cart;
};

/**
 * Recalculate total
 */
const recalcTotal = (cart) => {
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.priceAtTime,
    0
  );
};

module.exports = {
  addItemToCart,
  getCart,
  updateQuantity,
  removeItem
};
