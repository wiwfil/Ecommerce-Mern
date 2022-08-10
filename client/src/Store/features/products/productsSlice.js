import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  `products/getProducts`,
  async (query) => {
    try {
      const response = await axios.get(
        `https://mern-ecommerce-vagadrea.herokuapp.com/api/products?${query.slice(1)}`
      );

      return response.data;
    } catch (err) {
      const message = err.message;
      return message;
    }
  }
);

export const getPopularProducts = createAsyncThunk(
  "products/getPopularProducts",
  async (term) => {
    try {
    
      const response = await axios.get(
        `https://mern-ecommerce-vagadrea.herokuapp.com/api/products/popular?${term ? term : ""}`
      );

      return response.data;
    } catch (err) {
      const message = err.message;
      return message;
    }
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
  term: "",
  pageSize: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    search: (state, action) => {
      state.term = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.pageSize = action.payload.pageSize;
        state.status = "succeeded";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getPopularProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice;
