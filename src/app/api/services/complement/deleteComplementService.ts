import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const deleteComplementService = async (id: string) => {
  try {
    return prisma.complements.delete({
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
