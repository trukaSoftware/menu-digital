import { Product } from '@/types/product';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  products: Product[];
}

export interface RemoveProductPayload {
  productId: string;
}

export interface EditProductPayload {
  newProduct: Product;
}

const initialState: ProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: `categories`,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    removeProductFromList: (
      state,
      action: PayloadAction<RemoveProductPayload>
    ) => {
      const newProductsList = state.products.filter(
        (product) => product.id !== action.payload.productId
      );

      state.products = newProductsList;
    },

    editProductFromList: (state, action: PayloadAction<EditProductPayload>) => {
      const newProductsList = state.products.map((product) =>
        product.id === action.payload.newProduct.id
          ? action.payload.newProduct
          : product
      );

      state.products = newProductsList;
    },
  },
});

export const { setProducts, removeProductFromList, editProductFromList } =
  productsSlice.actions;

export default productsSlice.reducer;
