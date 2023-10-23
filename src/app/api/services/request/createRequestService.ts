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
    if (table && status === `OPEN`) {
      const requestExists = await prisma.requests.findFirst({
        where: { table },
      });

      if (requestExists) {
        return await prisma.requests.update({
          where: { id: requestExists.id },
          data: {
            products: JSON.stringify([
              ...JSON.parse(requestExists.products),
              ...JSON.parse(products),
            ]),
            totalValue: Number(requestExists.totalValue) + totalValue,
          },
        });
      }
    }

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
