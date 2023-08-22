import { GetCategoryReturn } from '@/types/category';

import api from '@/utils/api';

export interface GetCategoriesAxiosResponse {
  categories: GetCategoryReturn[];
}

export async function getCategories(companyId: string) {
  const data = await api.get<GetCategoriesAxiosResponse>(
    `/categories/getCategories?id=${companyId}`
  );

  return {
    categories: data?.data?.categories as GetCategoryReturn[],
  };
}
