import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if they contain non-serializable values
        ignoredActions: ['products/fetchProducts/fulfilled', 'cart/fetchCart/fulfilled'],
        // Ignore these field paths in all actions
        ignoredPaths: ['products.error', 'cart.error'],
      },
    }),
});

export default store;
