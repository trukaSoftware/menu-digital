import { GetCategoryReturn } from '@/types/category';
import { Product } from '@/types/product';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryState {
  categories: GetCategoryReturn[];
}

interface RemoveProductPayload {
  categoryId: string;
  productId: string;
}

interface EditProductPayload {
  newProduct: Product;
  oldCategoryId: string;
}

interface DeleteCategoryPayload {
  categoryId: string;
}

const initialState = {
  categories: [],
} as CategoryState;

const categoriesSlice = createSlice({
  name: `categories`,
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<GetCategoryReturn[]>) => {
      state.categories = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<DeleteCategoryPayload>) => {
      const newCategoryList = state.categories.filter(
        (category) => category.id !== action.payload.categoryId
      );

      state.categories = newCategoryList;
    },
    removeProductFromCategories: (
      state,
      action: PayloadAction<RemoveProductPayload>
    ) => {
      const indexOfTheCategory = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const newProductsList = state.categories[
        indexOfTheCategory
      ].categoryProducts.filter(
        (product) => product.id !== action.payload.productId
      );

      const newCategoriesList = state.categories.map((category) =>
        category.id === action.payload.categoryId
          ? { ...category, categoryProducts: newProductsList }
          : category
      );

      state.categories = newCategoriesList;
    },
    editProductFromCategories: (
      state,
      action: PayloadAction<EditProductPayload>
    ) => {
      const indexOfTheNewCategory = state.categories.findIndex(
        (category) =>
          category.id === action.payload.newProduct.productCategoriesId
      );

      const categoryDidNotChanged =
        action.payload.oldCategoryId ===
        action.payload.newProduct.productCategoriesId;

      if (categoryDidNotChanged) {
        const newProductsList = state.categories[
          indexOfTheNewCategory
        ].categoryProducts.map((product) =>
          product.id === action.payload.newProduct.id
            ? action.payload.newProduct
            : product
        );

        const newCategoriesList = state.categories.map((category) =>
          category.id === action.payload.newProduct.productCategoriesId
            ? { ...category, categoryProducts: newProductsList }
            : category
        );

        state.categories = newCategoriesList;

        return;
      }

      const indexOfTheOldCategory = state.categories.findIndex(
        (category) => category.id === action.payload.oldCategoryId
      );

      const oldProductsListWithoutProduct = state.categories[
        indexOfTheOldCategory
      ].categoryProducts.filter(
        (product) => product.id !== action.payload.newProduct.id
      );

      const newProductsList = [
        ...state.categories[indexOfTheNewCategory].categoryProducts,
        action.payload.newProduct,
      ];

      const newCategoriesList = state.categories.map((category) => {
        if (category.id === action.payload.newProduct.productCategoriesId) {
          return { ...category, categoryProducts: newProductsList };
        }

        if (category.id === action.payload.oldCategoryId) {
          return {
            ...category,
            categoryProducts: oldProductsListWithoutProduct,
          };
        }

        return category;
      });

      state.categories = newCategoriesList;
    },
  },
});

export const {
  setCategories,
  deleteCategory,
  removeProductFromCategories,
  editProductFromCategories,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
