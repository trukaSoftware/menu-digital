import { object, string, number, InferType, boolean } from 'yup';

const complementSchema = object({
  name: string().required(),
  maxAmount: number().min(1).required(),
  required: boolean().required(),
  companyId: string().required(),
});

export type ComplementData = InferType<typeof complementSchema>;

export const validateComplementData = (complementData: ComplementData) =>
  complementSchema.validate(complementData);
