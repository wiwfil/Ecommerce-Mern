import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(`product/getProduct`, async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/find/${id}`
    );
    return response.data;
  } catch (err) {
    const message = err.message;
    return message;
  }
});

const initialState = {
  data: [],
  similarProducts: [],
  status: "idle",
  error: null,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload.product;
        state.similarProducts = action.payload.similarProducts;
        state.status = "succeeded";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice;
