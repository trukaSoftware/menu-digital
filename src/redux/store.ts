import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './features/categories-slice';

export const store = configureStore({
  reducer: {
    categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
