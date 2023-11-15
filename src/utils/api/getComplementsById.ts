import { GetComplementByIdReturn } from '@/types/complement';

import api from '@/utils/api';

export async function getComplementsById(complementId: string) {
  const data = await api.get<GetComplementByIdReturn>(
    `complements/getComplementById?id=${complementId}`
  );

  return { complements: data?.data?.complements };
}
