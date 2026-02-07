import api from "./axios";

// Validation helpers
const validateProductId = (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }
};

const validateQuantity = (quantity) => {
  if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
    throw new Error("Quantity must be a positive integer");
  }
};

// GET CART with error handling
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch cart",
      status: error.response?.status,
      error
    };
  }
};

// ADD TO CART with validation
export const addToCart = async (productId, quantity = 1) => {
  try {
    validateProductId(productId);
    validateQuantity(quantity);

    const response = await api.post("/cart", { productId, quantity });
    return response;
  } catch (error) {
    if (error.message) {
      throw error; // Re-throw validation errors
    }
    throw {
      message: error.response?.data?.message || "Failed to add to cart",
      status: error.response?.status,
      error
    };
  }
};

// UPDATE QUANTITY (uses productId) with validation
export const updateCartItem = async (productId, quantity) => {
  try {
    validateProductId(productId);
    validateQuantity(quantity);

    const response = await api.patch(`/cart/${productId}`, { quantity });
    return response;
  } catch (error) {
    if (error.message) {
      throw error; // Re-throw validation errors
    }
    throw {
      message: error.response?.data?.message || "Failed to update cart",
      status: error.response?.status,
      error
    };
  }
};

// REMOVE ITEM (uses productId) with validation
export const removeCartItem = async (productId) => {
  try {
    validateProductId(productId);

    const response = await api.delete(`/cart/${productId}`);
    return response;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to remove item",
      status: error.response?.status,
      error
    };
  }
};
