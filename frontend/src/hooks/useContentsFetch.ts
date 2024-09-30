import { useInfiniteQuery } from 'react-query';
import { PageType } from 'types/api/article';

function useContentsFetch<T extends PageType>(
  fetchData: ({ pageParam }: { pageParam: number }) => Promise<T>,
  queryKey: string[],
  initialPage = 1,
) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = initialPage }) => fetchData({ pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.sliceDetails?.hasNext) {
            return lastPage.sliceDetails.currentPage + 1;
          }
          return undefined;
        },
      },
    );
  const allData = data?.pages.flatMap((page) => page.content) || [];

  return {
    allData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}
export default useContentsFetch;
