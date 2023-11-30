import { editItemResponse, editItemPayload } from '@/types/item';

import { put } from './put';

export const editItem = async ({
  complementId,
  id,
  name,
  price,
  visible,
}: editItemPayload) => {
  const item = await put<editItemResponse, editItemPayload>(
    `/api/items/editItem`,
    {
      complementId,
      id,
      name,
      price,
      visible,
    }
  );

  const editedItem = item.data.itemData;

  return editedItem;
};
