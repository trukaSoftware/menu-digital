import { GetComplementReturn } from '@/types/complement';

import api from '@/utils/api';

export async function getComplements(companyId: string) {
  const data = await api.get<GetComplementReturn>(
    `/complements/getComplements?companyId=${companyId}`
  );

  return { complements: data?.data?.complements };
}
