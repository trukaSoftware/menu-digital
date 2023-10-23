import { object, string, number, InferType } from 'yup';

const requestSchema = object({
  products: string().required(),
  companyId: string().required(),
  branchId: string(),
  status: string().oneOf([`OPEN`, `CLOSE`]).required(),
  table: string().nullable(),
  totalValue: number().required(),
});

export type RequestData = InferType<typeof requestSchema>;

export const validateRequestData = (requestData: RequestData) =>
  requestSchema.validate(requestData);
