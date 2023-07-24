import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const deleteImageService = async (id: string) => {
  try {
    return prisma.productImages.delete({
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
