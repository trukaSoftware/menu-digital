export const limitNumberOfCharacters = (value: string) => {
  if (value.length > 108) {
    return `${value.slice(0, 108).trim()}...`;
  }

  return value;
};
