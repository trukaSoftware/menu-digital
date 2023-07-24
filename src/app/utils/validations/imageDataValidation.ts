import { object, string, InferType, array, number } from 'yup';

const imagesSchema = object({
  id: string().required(),
  images: array(
    object({
      file: string().required(),
      name: string().required(),
      alt: string().required(),
      width: number(),
      height: number(),
    })
  ).required(),
});

export type ImageData = InferType<typeof imagesSchema>;

export const validateImageData = (imageData: ImageData) =>
  imagesSchema.validate(imageData);
