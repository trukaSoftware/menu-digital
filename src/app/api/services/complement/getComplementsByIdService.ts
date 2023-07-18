import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getComplementsByIdService = async (id: string) => {
  try {
    const complement = await prisma.complements.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    return complement;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
