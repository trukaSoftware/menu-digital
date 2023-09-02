import { TypedUseSelectorHook, useSelector } from 'react-redux';

import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import categoriesReducer from './features/categories-slice';

export const rootReducer = combineReducers({
  categoriesReducer,
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
