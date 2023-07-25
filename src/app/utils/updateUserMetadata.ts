import { clerkClient } from '@clerk/nextjs';

type UpadateUserMetadata = {
  id: string;
  publicMetadata: {
    slug: string;
  };
};

export const updateUserMetadata = async ({
  id,
  publicMetadata,
}: UpadateUserMetadata) =>
  clerkClient.users.updateUser(id, {
    publicMetadata,
  });
