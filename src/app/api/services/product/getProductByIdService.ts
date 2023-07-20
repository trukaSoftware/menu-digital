import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getProductByIdService = async (id: string) => {
  try {
    const product = await prisma.products.findUnique({
      where: { id },
      include: {
        productsImages: true,
        productsComplements: {
          include: {
            complements: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
