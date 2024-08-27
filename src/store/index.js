import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "./cartSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";


const persistCardConfig = {
    key: 'cart',
    storage
}

const persistCart = persistReducer(persistCardConfig,cartSlice)

export const store = configureStore({
    reducer:{
        cart:persistCart
    },
    devTools:true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
   

})

export const persistor = persistStore(store)