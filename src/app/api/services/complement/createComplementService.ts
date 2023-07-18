import { ComplementData } from '@/app/utils/validations/complementsDataValidation';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const createComplementService = async ({
  name,
  maxAmount,
}: ComplementData) => {
  try {
    const complementExists = await prisma.complements.findFirst({
      where: { name },
    });

    if (complementExists) throw new Error(`Complement already exists`);

    const complement = await prisma.complements.create({
      data: {
        name,
        maxAmount,
      },
    });

    return complement.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};
