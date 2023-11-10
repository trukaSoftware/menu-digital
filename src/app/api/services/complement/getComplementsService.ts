import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getComplementsService = async (companyId: string) => {
  try {
    const existCompany = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!existCompany) throw new Error(`Empresa não encontrada`);

    const complements = await prisma.complements.findMany({
      where: {
        companyId,
      },
      include: {
        items: true,
        productsComplements: true,
      },
    });

    return complements;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
