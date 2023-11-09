import { ItemReturn } from '@/types/item';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface ItemsState {
  items: ItemReturn[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: `items`,
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ItemReturn[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;

export const getItems = (state: RootState) => state.itemsReducer.items;

export default itemsSlice.reducer;
