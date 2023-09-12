import { EditManyProductsCategoryResponse } from '@/types/category';

import { EditManyProductsCategoryData } from '../types';
import { put } from './put';

export const editManyProductsCategory = async (
  payload: EditManyProductsCategoryData,
  companyId: string
) => {
  const updatedCategories = await put<
    EditManyProductsCategoryResponse,
    EditManyProductsCategoryData
  >(`/api/categories/editManyProductsCategory?companyId=${companyId}`, {
    ...payload,
  });

  const editedPropduct = updatedCategories.data.updatedCategories;
  return editedPropduct;
};
