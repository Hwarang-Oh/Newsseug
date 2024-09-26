export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16); // 16진수로 변환
    return hex.length === 1 ? '0' + hex : hex; // 두 자리 수로 맞춤
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase(); // 헥사코드로 반환
};
