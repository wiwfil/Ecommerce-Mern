import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(`category/getProduct`, async () => {
  try {
    const response = await axios.get(`https://mern-ecommerce-vagadrea.herokuapp.com/api/category`);
    return response.data;
  } catch (err) {
    const message = err.message;
    return message;
  }
});

export const getPopularCategory = createAsyncThunk(
  `category/getPopularCategory`,
  async () => {
    try {
      const response = await axios.get(
        `https://mern-ecommerce-vagadrea.herokuapp.com/api/category/popular`
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
  popularCategories: [],
  status: "idle",
  error: null,
  message: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getPopularCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPopularCategory.fulfilled, (state, action) => {
        state.popularCategories = action.payload;
        state.status = "succeeded";
      })
      .addCase(getPopularCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice;
