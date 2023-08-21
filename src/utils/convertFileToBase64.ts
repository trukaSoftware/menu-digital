import { Dispatch, SetStateAction } from 'react';

export const convertFileToBase64 = (
  file: File | undefined,
  errorFunction: Dispatch<SetStateAction<string>>
) =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }
    } catch (error) {
      errorFunction(`Erro ao converter a imagem para base64`);
    }
  });
