import cloudinary from './cloudinary';

type UploadImagesData = {
  file: string;
  name: string;
  alt: string;
  width?: number;
  height?: number;
};

type UploadPreset = {
  folder: string;
  width?: number;
  height?: number;
};

const uploadBase64Image = async (
  base64String: string,
  upload_preset: UploadPreset
): Promise<string> => {
  const response = await cloudinary.uploader.upload(
    base64String,
    upload_preset
  );

  return response.secure_url;
};

export const uploadImages = async (images: UploadImagesData[]) => {
  const result = images.map(async (image) => {
    const secure_url = await uploadBase64Image(image.file, {
      folder: `products`,
      width: image.width || 300,
      height: image.height || 300,
    });

    return {
      name: image.name,
      alt: image.alt,
      imageUrl: secure_url,
    };
  });

  const resolvedResult = await Promise.all(result);

  return resolvedResult;
};
