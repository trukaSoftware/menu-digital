import { itemPayload, itemResponse } from '@/types/item';

import { post } from './post';

export const createItem = async ({
  complementId,
  name,
  price,
}: itemPayload) => {
  const item = await post<itemResponse, itemPayload>(`/api/items/createItem`, {
    complementId,
    name,
    price,
  });

  const createdItem = item.data.item;

  return createdItem;
};
