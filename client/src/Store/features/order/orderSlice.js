import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  `order/createOrder`,
  async (orderItems) => {
    try {
      const response = await axios.post(
        `https://mern-ecommerce-vagadrea.herokuapp.com/api/order`,
        orderItems
      );
      return response.data;
    } catch (err) {
      const message = err.message;
      return message;
    }
  }
);

export const getOrders = createAsyncThunk(`order/getOrders`, async (userID) => {
  try {
    const response = await axios.get(
      `https://mern-ecommerce-vagadrea.herokuapp.com/api/order/find/${userID}`
    );
    return response.data;
  } catch (err) {
    const message = err.message;
    return message;
  }
});

const initialState = {
  data: [],
  userOrders: [],
  status: "idle",
  error: null,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;

        state.status = "succeeded";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice;
