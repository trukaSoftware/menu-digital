import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getComplementsService = async () => {
  try {
    const complements = await prisma.complements.findMany({
      include: {
        items: true,
      },
    });

    return complements;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
