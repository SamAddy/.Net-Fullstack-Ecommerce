import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../../type/Cart";

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: "shoppingCart",
    initialState, 
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter(
              (item) => item.product.id !== action.payload.id
            );
          },
          updateCartItemQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const index = state.items.findIndex((item) => item.product.id === action.payload.id);
            if (index !== -1) {
              const updatedItem = { ...state.items[index] };
              updatedItem.quantity = action.payload.quantity;
              const updatedItems = [...state.items];
              updatedItems[index] = updatedItem;
              state.items = updatedItems;
            }
          }
    }
})


export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;