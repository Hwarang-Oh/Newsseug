export const getBrightness = (r: number, g: number, b: number) => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};
