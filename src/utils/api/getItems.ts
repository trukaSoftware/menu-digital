import { GetItemReturn } from '@/types/item';

import api from '@/utils/api';

export async function getItems(companyId: string) {
  const data = await api.get<GetItemReturn>(
    `/items/getItems?companyId=${companyId}`
  );

  return { items: data?.data?.items };
}
