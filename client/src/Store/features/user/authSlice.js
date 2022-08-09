import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

///tojkdsjkldaskdas
axios.defaults.withCredentials = true;

export const getUser = createAsyncThunk(
  `login/getUser`,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://mern-ecommerce-vagadrea.herokuapp.com/api/auth/login`,
        {
          username: data.username,
          password: data.password,
        }
      );
      const { accessToken, ...userWithoutToken } = response.data;

      window.sessionStorage.setItem("user", JSON.stringify(userWithoutToken));

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const postUser = createAsyncThunk(`signup/postUser`, async (data) => {
  try {
    const response = await axios.post(`https://mern-ecommerce-vagadrea.herokuapp.com/api/auth/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    const message = err.message;
    return message;
  }
});

const initialState = {
  data: [],
  status: "idle",
  error: null,
  message: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        window.sessionStorage.removeItem("user");
      });
    builder
      .addCase(postUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        window.sessionStorage.removeItem("user");
        window.sessionStorage.removeItem("ordersState");
      });
  },
});

export default authSlice;
