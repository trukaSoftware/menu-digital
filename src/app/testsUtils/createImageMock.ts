export const createImageMock = () => {
  const imageLogoContent = {} as Uint8Array;

  const imageFile = new File([imageLogoContent], `image.png`, {
    type: `image/png`,
  });

  return imageFile;
};
