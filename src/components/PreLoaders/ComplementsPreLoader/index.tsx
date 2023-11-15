'use client';

import { useRef } from 'react';

import { Complement } from '@/types/complement';

import { setComplements } from '@/redux/features/complements-slice';
import { store } from '@/redux/store';

export interface ComplementsPreLoaderProps {
  complements: Complement[];
}

export default function ComplementsPreLoader({
  complements,
}: ComplementsPreLoaderProps) {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    store.dispatch(setComplements(complements));
    isMounted.current = true;
  }

  return null;
}
