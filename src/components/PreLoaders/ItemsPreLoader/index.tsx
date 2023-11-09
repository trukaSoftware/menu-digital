'use client';

import { useRef } from 'react';

import { ItemReturn } from '@/types/item';

import { setItems } from '@/redux/features/items-slice';
import { store } from '@/redux/store';

export interface ItemsPreLoaderProps {
  items: ItemReturn[];
}

export default function ItemsPreLoader({ items }: ItemsPreLoaderProps) {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    store.dispatch(setItems(items));
    isMounted.current = true;
  }

  return null;
}
