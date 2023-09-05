'use client';

import { useRef } from 'react';

import { Product } from '@/types/product';

import { setProducts } from '@/redux/features/products-slice';
import { store } from '@/redux/store';

export interface ProductsPreLoaderProps {
  products: Product[];
}

export default function ProductsPreLoader({
  products,
}: ProductsPreLoaderProps) {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    store.dispatch(setProducts(products));
    isMounted.current = true;
  }

  return null;
}
