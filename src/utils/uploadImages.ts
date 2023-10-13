import cloudinary from './cloudinary';

type UploadImagesData = {
  file: string;
  name?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type UploadPreset = {
  folder: string;
  public_id: string;
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

export const uploadImages = async (
  images: UploadImagesData[],
  public_id: string,
  folder = `products`
) => {
  const result = images.map(async (image, index) => {
    const secure_url = await uploadBase64Image(image.file, {
      folder,
      public_id: `${public_id}-${index}-${Date.now()}`,
      width: image.width || 500,
      height: image.height || 500,
    });

    return {
      name: image.name || ``,
      alt: image.alt || ``,
      imageUrl: secure_url,
    };
  });

  const resolvedResult = await Promise.all(result);

  return resolvedResult;
};
