import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "./cartSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./authSlice";


const persistCardConfig = {
    key: 'cart',
    storage
}

const persistAuthConfig = {
    key:"auth",
    storage
}

const persistCart = persistReducer(persistCardConfig,cartSlice)
const persisAuth = persistReducer(persistAuthConfig,authSlice)

export const store = configureStore({
    reducer:{
        cart:persistCart,
        auth:persisAuth,
    },
    devTools:true,
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //       serializableCheck: false,
    //     }),
   

})

export const persistor = persistStore(store)