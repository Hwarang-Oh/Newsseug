export const formatNumber = (viewCount: number): string => {
  if (viewCount >= 100000000) {
    return (viewCount / 100000000).toFixed(1) + '억'; // 억 단위
  } else if (viewCount >= 10000000) {
    return (viewCount / 10000).toFixed(0) + '만'; // 천만 단위
  } else if (viewCount >= 10000) {
    return (viewCount / 10000).toFixed(1) + '만'; // 만 단위
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + '천'; // 천 단위
  } else {
    return viewCount.toString(); // 천 미만일 경우 그대로 출력
  }
};
