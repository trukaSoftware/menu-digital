import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ComplementData } from '@yup/back/complementsDataValidation';

export const createComplementService = async ({
  name,
  maxAmount,
  required,
  companyId,
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
        required,
        companyId,
      },
    });

    return complement.id;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
