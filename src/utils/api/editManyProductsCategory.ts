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

  if (updatedCategories.status !== 200) {
    throw new Error(`Não foi possível editar a categoria`);
  }

  const editedPropduct = updatedCategories.data.updatedCategories;
  return editedPropduct;
};
