import { Complement } from '@/types/complement';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface ComplementsState {
  complements: Complement[];
}

const initialState: ComplementsState = {
  complements: [],
};

const complementsSlice = createSlice({
  name: `complements`,
  initialState,
  reducers: {
    setComplements: (state, action: PayloadAction<Complement[]>) => {
      state.complements = action.payload;
    },
  },
});

export const { setComplements } = complementsSlice.actions;

export const getComplements = (state: RootState) =>
  state.complementsReducer.complements;

export default complementsSlice.reducer;
