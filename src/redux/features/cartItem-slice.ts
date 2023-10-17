import { CartItemProps } from '@/components/FoodCardDialog';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface CartItemState {
  cartItems: CartItemProps[];
}

const initialState: CartItemState = {
  cartItems: [],
};

const CartItemSlice = createSlice({
  name: `cartItems`,
  initialState,
  reducers: {
    setCartItens: (state, action: PayloadAction<CartItemProps[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItens } = CartItemSlice.actions;

export const getCartItens = (state: RootState) =>
  state.cartItemReducer.cartItems;

export default CartItemSlice.reducer;
