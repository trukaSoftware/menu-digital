import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const deleteCompanyService = async (id: string) => {
  try {
    return prisma.company.delete({
      where: { id },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
