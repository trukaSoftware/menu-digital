import { object, string, number, InferType } from 'yup';

const itemSchema = object({
  complementId: string().required(),
  name: string().required(),
  price: number().min(1).required(),
});

export type ItemData = InferType<typeof itemSchema>;

export const validateItemData = (itemData: ItemData) =>
  itemSchema.validate(itemData);
