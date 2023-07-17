import { object, string, number, InferType } from 'yup';

const complementSchema = object({
  name: string().required(),
  maxAmount: number().min(1).required(),
});

export type ComplementData = InferType<typeof complementSchema>;

export const validateComplementData = (companyData: ComplementData) =>
  complementSchema.validate(companyData);
