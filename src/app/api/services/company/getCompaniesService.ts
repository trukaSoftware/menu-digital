import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCompaniesService = async () => {
  try {
    const companies = await prisma.company.findMany({
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
