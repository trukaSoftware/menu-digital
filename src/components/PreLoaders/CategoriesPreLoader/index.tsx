'use client';

import { useRef } from 'react';

import { GetCategoryReturn } from '@/types/category';

import { setCategories } from '@/redux/features/categories-slice';
import { store } from '@/redux/store';

export interface CategoriesPreLoaderProps {
  categories: GetCategoryReturn[];
}

export default function CategoriesPreLoader({
  categories,
}: CategoriesPreLoaderProps) {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    store.dispatch(setCategories(categories));
    isMounted.current = true;
  }

  return null;
}
