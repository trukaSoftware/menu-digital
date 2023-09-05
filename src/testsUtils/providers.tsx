import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { categoriesMock } from '@/mocks/categories';
import { productsMocks } from '@/mocks/products';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

import { rootReducer, type AppStore, type RootState } from '../redux/store';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithRedux(
  ui: React.ReactElement,
  {
    preloadedState = {
      categoriesReducer: {
        categories: categoriesMock,
      },
      productsReducer: {
        products: productsMocks,
      },
    } as RootState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
