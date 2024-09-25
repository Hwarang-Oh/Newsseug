export const parseRgbString = (rgbString: string): [number, number, number] => {
  const rgbValues = rgbString
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);
  return [rgbValues[0], rgbValues[1], rgbValues[2]];
};
