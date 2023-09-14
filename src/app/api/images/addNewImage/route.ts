import { NextResponse } from 'next/server';

import { ImageData, validateImageData } from '@yup/back/imageDataValidation';

import { addNewImageService } from '../../services/image/addNewImageService';

export async function POST(req: Request) {
  const { id, images } = (await req.json()) as ImageData;

  try {
    await validateImageData({
      id,
      images,
    });

    const productsImages = await addNewImageService({
      id,
      images,
    });

    return NextResponse.json({
      message: `Imagens adicionadas com sucesso`,
      productsImages,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
