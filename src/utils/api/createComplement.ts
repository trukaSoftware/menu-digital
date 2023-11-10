import { ComplementPayload, ComplementResponse } from '@/types/complement';

import { post } from './post';

export const createComplement = async ({
  name,
  maxAmount,
  required,
  companyId,
}: ComplementPayload) => {
  const complement = await post<ComplementResponse, ComplementPayload>(
    `/api/complements/createComplement`,
    {
      name,
      maxAmount,
      required,
      companyId,
    }
  );

  const createdComplement = complement.data;

  return createdComplement;
};
