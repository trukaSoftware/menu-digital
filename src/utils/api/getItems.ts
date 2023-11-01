import { GetItemReturn } from '@/types/item';

import api from '@/utils/api';

export async function getItems() {
  const data = await api.get<GetItemReturn>(`/items/getItems`);

  return { items: data?.data?.items };
}
