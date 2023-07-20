import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getProductsService = async () => {
  try {
    const products = await prisma.products.findMany({
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

    return products;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
