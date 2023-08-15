import { GetCategoryReturn } from '@/types/category';

import { getter } from './getter';

export interface GetCategoriesAxiosResponse {
  categories: GetCategoryReturn[];
}

export async function getCategories(companyId: string) {
  const data = await getter<GetCategoriesAxiosResponse>(
    `/api/categories/getCategories?id=${companyId}`
  );

  return {
    categories: data?.data?.categories as GetCategoryReturn[],
  };
}
