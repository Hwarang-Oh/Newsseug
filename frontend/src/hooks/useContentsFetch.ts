import { useInfiniteQuery } from 'react-query';
import { Category, PageParamsType, PageType } from 'types/api/article';

function useContentsFetch<T extends PageType>(
  sectionType: string,
  queryKey: string[],
  fetchData: ({ category, page }: PageParamsType) => Promise<T>,
  category: Category | string = 'ALL',
  initialPage = 1,
) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = initialPage }) => fetchData({ page: pageParam, category }),
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
    queryKey,
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    sliceDetails,
  };
}
export default useContentsFetch;
