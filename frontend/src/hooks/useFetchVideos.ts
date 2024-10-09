import { useQuery } from 'react-query';
import { fetchEachArticle } from 'apis/articleVideoApi';
import { ArticleVideo as ArticleVideoType } from 'types/api/articleVideo';

/**
 * 커스텀 훅: 비디오 데이터 페칭 및 상태 관리
 * @param articleIds - 페칭할 비디오의 ID 배열
 * @param activeIndex - 현재 슬라이드 인덱스
 */
export const useFetchVideos = (articleIds: number[], activeIndex: number) => {
  // 페칭할 슬라이드 인덱스 범위 계산
  const startIndex = Math.max(activeIndex - 1, 0);
  const endIndex = Math.min(activeIndex + 1, articleIds.length - 1);
  const idsToFetch = articleIds.slice(startIndex, endIndex + 1);

  // React Query를 사용하여 비디오 데이터 페칭
  const {
    data: videoList = {},
    isLoading,
    isError,
  } = useQuery(
    ['videos', idsToFetch],
    async () => {
      const fetchPromises = idsToFetch.map(async (id: number) => {
        const videoData = await fetchEachArticle(id);
        return { id, videoData };
      });

      const results = await Promise.all(fetchPromises);
      return results.reduce(
        (acc, { id, videoData }) => {
          acc[id] = videoData;
          return acc;
        },
        {} as { [id: number]: ArticleVideoType },
      );
    },
    {
      keepPreviousData: true, // 기존 데이터를 유지
    },
  );

  return { videoList, isLoading, isError };
};
