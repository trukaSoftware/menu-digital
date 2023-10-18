import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { RequestData } from '@yup/back/requestDataValidation';

export const createRequestService = async ({
  products,
  companyId,
  branchId,
  status,
  table,
  totalValue,
}: RequestData) => {
  try {
    const requestExists = await prisma.requests.findFirst({
      where: { table },
    });

    if (requestExists)
      throw new Error(`Uma Request para mesa ${table} já existe`);

    const request = await prisma.requests.create({
      data: {
        products,
        companyId,
        branchId,
        status,
        table,
        totalValue,
      },
    });

    return request;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
