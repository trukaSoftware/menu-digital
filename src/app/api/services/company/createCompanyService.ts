import { createSlug } from '@/app/utils/createSlug';
import { updateUserMetadata } from '@/app/utils/updateUserMetadata';
import { uploadImages } from '@/app/utils/uploadImages';
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
  companyLogo,
  companyTheme,
  phoneNumber,
  deliveryPhoneNumber,
}: CompanyData) => {
  const companyImages = [companyLogo, companyTheme];

  const imagesUrls = await uploadImages(companyImages, name, `companies`);

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
            companyLogoUrl: imagesUrls[0].imageUrl,
            companyThemeUrl: imagesUrls[1].imageUrl,
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
