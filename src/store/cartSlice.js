import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:[],
    total:{
        id:1,
        qtny:5
    }
}

export const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{}
})

export default CartSlice.reducer