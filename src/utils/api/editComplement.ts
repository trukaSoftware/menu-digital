import {
  editComplementResponse,
  editComplementPayload,
} from '@/types/complement';

import { put } from './put';

export const editComplement = async ({
  maxAmount,
  id,
  name,
  required,
}: editComplementPayload) => {
  const complement = await put<editComplementResponse, editComplementPayload>(
    `/api/complements/editComplement`,
    {
      maxAmount,
      id,
      name,
      required,
    }
  );

  const editedComplement = complement.data.complementData;

  return editedComplement;
};
