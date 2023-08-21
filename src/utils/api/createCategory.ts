import { CategoryPayload, CreateCategoryResponse } from '@/types/category';

import { post } from './post';

export const createCategory = async ({ name, companyId }: CategoryPayload) => {
  const category = await post<CreateCategoryResponse, CategoryPayload>(
    `/api/categories/createCategory`,
    {
      name,
      companyId,
    }
  );

  const createdCategory = category.data.category;

  return createdCategory;
};
