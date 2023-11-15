import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getItemsService = async (companyId: string) => {
  try {
    const existCompany = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!existCompany) throw new Error(`Empresa não encontrada`);

    const items = await prisma.items.findMany({
      where: {
        companyId,
      },
    });

    return items;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
