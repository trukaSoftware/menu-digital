import { TypedUseSelectorHook, useSelector } from 'react-redux';

import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import cartItemReducer from './features/cartItem-slice';
import categoriesReducer from './features/categories-slice';
import complementsReducer from './features/complements-slice';
import itemsReducer from './features/items-slice';
import productsReducer from './features/products-slice';

export const rootReducer = combineReducers({
  categoriesReducer,
  productsReducer,
  cartItemReducer,
  complementsReducer,
  itemsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
