import { useEffect, useState } from 'react';

import { CategoryReturn, GetCategoriesResponse } from '@/types/category';

import { getter } from '@/app/utils/api/getter';

export function useCategories() {
  const [categories, setCategories] = useState<CategoryReturn[]>([]);
  const [gettingCategories, setGettingCategories] = useState(true);

  const getCategoriesResponse = async () => {
    const { data } = await getter<GetCategoriesResponse>(
      `/api/categories/getCategories`
    );

    setCategories(data?.categories);
    setGettingCategories(false);
  };

  useEffect(() => {
    getCategoriesResponse();
  }, []);

  return { categories, gettingCategories };
}
