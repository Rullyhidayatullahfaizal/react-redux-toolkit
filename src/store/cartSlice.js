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
    reducers:{
        addToCart : (state,action) => {
            console.log("addToCart dari redux", action.payload);
            
            const isItemExist = state.value.find(
                (item) => item.id === action.payload.id
              );
              if (isItemExist) {
                isItemExist.quantity++;
                return;
              }
            state.value.push({...action.payload,quantity:1})

        }
    }
})
export const {addToCart} = CartSlice.actions
export default CartSlice.reducer