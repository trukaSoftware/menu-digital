import { ItemPayload, ItemResponse } from '@/types/item';

import { post } from './post';

export const createItem = async ({
  complementId,
  items,
  companyId,
}: ItemPayload) => {
  const item = await post<ItemResponse, ItemPayload>(`/api/items/createItem`, {
    complementId,
    items,
    companyId,
  });

  const createdItem = item.data.item;

  return createdItem;
};
