import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/cart/cartSlice";
import authSlice from "./features/user/authSlice";
import categorySlice from "./features/categories/categorySlice";
import orderSlice from "./features/order/orderSlice";


export const store = configureStore({
    reducer:{
        products:productsSlice.reducer,
        product:productSlice.reducer,
        cart:cartSlice.reducer,
        login:authSlice.reducer,
        category:categorySlice.reducer,
        order:orderSlice.reducer
    }
})

export default store;
