import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  total: {
    id: 1,
    qtny: 5,
  },
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("addToCart dari redux", action.payload);

      const itemIndex = state.value.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.value[itemIndex].quantity += action.payload.quantity;
      } else {
        state.value.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    deleteToCart:(state,action) => {
        const filterCart = state.value.filter(
            (item) => item.id !== action.payload
        )
        state.value = filterCart
    }
  },
});
export const { addToCart,deleteToCart } = CartSlice.actions;
export default CartSlice.reducer;
