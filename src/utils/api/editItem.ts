import { editItemResponse, editItemPayload } from '@/types/item';

import { put } from './put';

export const editItem = async ({
  complementId,
  id,
  name,
  price,
}: editItemPayload) => {
  const item = await put<editItemResponse, editItemPayload>(
    `/api/items/editItem`,
    {
      complementId,
      id,
      name,
      price,
    }
  );

  const editedItem = item.data.itemData;

  return editedItem;
};
