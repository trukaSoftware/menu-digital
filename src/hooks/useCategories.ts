import { useEffect, useState } from 'react';

import { GetCategoriesResponse, GetCategoryReturn } from '@/types/category';

import { getter } from '@/utils/api/getter';

export function useCategories(companyId: string) {
  const [categories, setCategories] = useState<GetCategoryReturn[]>([]);
  const [gettingCategories, setGettingCategories] = useState(true);

  useEffect(() => {
    const getCategoriesResponse = async () => {
      const { data } = await getter<GetCategoriesResponse>(
        `/api/categories/getCategories?id=${companyId}`
      );

      setCategories(data.categories);
      setGettingCategories(false);
    };

    getCategoriesResponse();
  }, [companyId]);

  return { categories, gettingCategories };
}
