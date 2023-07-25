import { createSlug } from '@/app/utils/createSlug';
import { updateUserMetadata } from '@/app/utils/updateUserMetadata';
import { CompanyData } from '@/app/utils/validations/companyDataValidation';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const createCompanyService = async ({
  id,
  name,
  email,
  cnpj,
  address,
  zipCode,
  phoneNumber,
  deliveryPhoneNumber,
}: CompanyData) => {
  try {
    const company = await prisma.company.create({
      data: {
        id,
        name,
        slug: createSlug(name),
        status: `ACTIVE`,
        info: {
          create: {
            email,
            cnpj,
            phoneNumber,
            deliveryPhoneNumber: deliveryPhoneNumber || phoneNumber,
            address: {
              create: {
                address,
                zipCode,
              },
            },
          },
        },
      },
    });

    await updateUserMetadata({ id, publicMetadata: { slug: company.slug } });

    return company.id;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Error
    ) {
      throw new Error(error.message);
    }
  }
};
