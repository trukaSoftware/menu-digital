import { useEffect, useState } from 'react';

import { GetCategoryReturn } from '@/types/category';

import { getCategories } from '@/app/utils/api/getCategories';

export function useCategories(companyId: string) {
  const [categories, setCategories] = useState<GetCategoryReturn[]>([]);
  const [gettingCategories, setGettingCategories] = useState(true);

  useEffect(() => {
    const getCategoriesResponse = async () => {
      const { categories: categoriesReturn } = await getCategories(companyId);

      setCategories(categoriesReturn);
      setGettingCategories(false);
    };

    getCategoriesResponse();
  }, [companyId]);

  return { categories, gettingCategories };
}
