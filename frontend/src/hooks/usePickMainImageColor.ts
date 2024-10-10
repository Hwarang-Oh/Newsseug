import { useEffect, useState, useRef } from 'react';
import ColorThief from 'colorthief';

const usePickMainImageColor = (imageUrl: string) => {
  const [color, setColor] = useState('');
  const timestamp = useRef(new Date().getTime()).current;

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      const colorThief = new ColorThief();

      img.crossOrigin = 'anonymous';
      img.src = `${imageUrl}?${timestamp}`; // 캐시 우회용 timestamp 추가

      img.onload = () => {
        try {
          const palette = colorThief.getPalette(img, 5);
          const result = palette[2];
          setColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
        } catch (error) {
          console.error('Color extraction failed:', error);
        }
      };
    }
  }, [imageUrl, timestamp]);

  return color;
};

export default usePickMainImageColor;
