export const createSlug = (texto: string) => {
  let resultado = texto.toLowerCase();

  resultado = resultado.replace(/\s/g, `-`);
  resultado = resultado.normalize(`NFD`).replace(/[\u0300-\u036f]/g, ``);
  resultado = resultado.replace(/[^a-z0-9-]/g, ``);
  resultado = resultado.replace(/-+/g, `-`);

  return resultado;
};
