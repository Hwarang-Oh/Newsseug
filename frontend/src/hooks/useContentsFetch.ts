import { useInfiniteQuery } from 'react-query';
import { PageParamsType, PageType } from 'types/api/article';

function useContentsFetch<T extends PageType>(
  sectionType: string = 'Specific Section Type',
  fetchData: ({ category, page }: PageParamsType) => Promise<T>,
  queryKey: string,
  initialPage = 1,
) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = initialPage }) => fetchData({ page: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.sliceDetails?.hasNext) {
            return lastPage.sliceDetails.currentPage + 1;
          }
          return undefined;
        },
      },
    );
  const sliceDetails = data?.pages[data.pages.length - 1].sliceDetails || {};
  const articleList = data?.pages.flatMap((page) => page.content) || [];

  return {
    sectionType,
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    sliceDetails,
  };
}
export default useContentsFetch;
