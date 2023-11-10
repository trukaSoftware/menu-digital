import { object, string, number, InferType, array } from 'yup';

const itemSchema = object({
  complementId: string().required(),
  items: array()
    .of(
      object()
        .shape({
          name: string().required(),
          price: number().required(),
        })
        .required()
    )
    .required(),
  companyId: string().required(),
});

export type ItemData = InferType<typeof itemSchema>;

export const validateItemData = (itemData: ItemData) =>
  itemSchema.validate(itemData);
