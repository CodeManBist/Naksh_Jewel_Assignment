import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../../api/cartApi";

/* ================== THUNKS ================== */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCart();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await addToCart(productId, quantity);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add item");
    }
  }
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await updateCartItem(productId, quantity);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update item");
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await removeCartItem(productId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove item");
    }
  }
);

/* ================== STATE ================== */

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  loading: false,
  error: null,
  message: null,
  lastUpdated: null,
};

/* ================== SLICE ================== */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.items || [];
        state.totalAmount = action.payload.data.totalAmount || 0;
        state.totalItems = action.payload.data.items?.length || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.data.items || [];
        state.totalAmount = action.payload.data.totalAmount || 0;
        state.totalItems = action.payload.data.items?.length || 0;
        state.message = action.payload.message; 
      })

      /* UPDATE */
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = action.payload.data.items || [];
        state.totalAmount = action.payload.data.totalAmount || 0;
        state.totalItems = action.payload.data.items?.length || 0;
        state.message = action.payload.message;
      })

      /* REMOVE */
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload.data.items || [];
        state.totalAmount = action.payload.data.totalAmount || 0;
        state.totalItems = action.payload.data.items?.length || 0;
        state.message = action.payload.message;
      });
  },
});

export const { clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
