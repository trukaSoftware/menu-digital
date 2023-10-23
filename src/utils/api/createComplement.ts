import { ComplementPayload, ComplementResponse } from '@/types/complement';

import { post } from './post';

export const createComplement = async ({
  name,
  maxAmount,
  required,
}: ComplementPayload) => {
  const complement = await post<ComplementResponse, ComplementPayload>(
    `/api/complements/createComplement`,
    {
      name,
      maxAmount,
      required,
    }
  );

  const createdComplement = complement.data;

  return createdComplement;
};
