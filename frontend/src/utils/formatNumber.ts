export const formatNumber = (viewCount: number): string => {
  const formatDecimal = (num: number, divisor: number): string => {
    const result = num / divisor;
    const decimalPart = result - Math.floor(result); // 소수점 이하 계산

    // 소수 첫째 자리가 0인지 확인 (0.x 형식)
    return decimalPart < 0.1 ? result.toFixed(0) : result.toFixed(1);
  };

  if (viewCount >= 100000000) {
    return formatDecimal(viewCount, 100000000) + '억'; // 억 단위
  } else if (viewCount >= 10000000) {
    return (viewCount / 10000).toFixed(0) + '만'; // 천만 단위
  } else if (viewCount >= 10000) {
    return formatDecimal(viewCount, 10000) + '만'; // 만 단위
  } else if (viewCount >= 1000) {
    return formatDecimal(viewCount, 1000) + '천'; // 천 단위
  } else {
    return viewCount.toString(); // 천 미만일 경우 그대로 출력
  }
};
