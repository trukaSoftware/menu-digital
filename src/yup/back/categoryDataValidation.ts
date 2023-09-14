import { object, string, InferType } from 'yup';

const categorySchema = object({
  companyId: string().required(),
  name: string().required(),
});

export type CategoryData = InferType<typeof categorySchema>;

export const validateCategoryData = (categoryData: CategoryData) =>
  categorySchema.validate(categoryData);
