import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCompanyByIdService = async (id: string) => {
  try {
    const companies = await prisma.company.findUnique({
      where: { id },
      include: {
        info: {
          include: {
            address: true,
          },
        },
      },
    });

    return companies;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
