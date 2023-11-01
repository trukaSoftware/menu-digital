import { GetComplementReturn } from '@/types/complement';

import api from '@/utils/api';

export async function getComplements() {
  const data = await api.get<GetComplementReturn>(
    `/complements/getComplements`
  );

  return { complements: data?.data?.complements };
}
