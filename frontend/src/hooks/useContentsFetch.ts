import { useInfiniteQuery } from 'react-query';
import { Category, PageParamsType, PageType } from 'types/api/article';

function useContentsFetch<T extends PageType>({
  queryKey,
  fetchData,
  category,
  pressId,
  sectionType,
  initialPage = 1,
}: {
  queryKey: string[];
  fetchData: ({ category, page, pressId }: PageParamsType) => Promise<T>;
  category?: Category;
  pressId?: string;
  sectionType?: string;
  initialPage?: number;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = initialPage }) => {
        if (category && pressId) {
          return fetchData({ page: pageParam, category, pressId });
        } else if (category) {
          return fetchData({ page: pageParam, category });
        } else {
          return fetchData({ page: pageParam });
        }
      },
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.sliceDetails?.hasNext) {
            return lastPage.sliceDetails.currentPage + 1;
          }
          return undefined;
        },
      },
    );

  const pages = data?.pages || [];
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
