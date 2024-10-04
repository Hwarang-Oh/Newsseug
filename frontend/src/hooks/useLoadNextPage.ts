import { useDispatch, useSelector } from 'react-redux';
import { setArticleIds, setSliceDetail } from '../redux/articleSlice';
import { RootState } from '../redux/index';
import { fetchArticles, fetchArticlesByToday } from 'apis/articleApi';
import { getPressArticleList } from 'apis/subscribe';
import { getFolderInfo } from 'apis/folderApi';
import { getMemberHistoryList } from 'apis/memberApi';

export const useLoadNextPage = () => {
  const dispatch = useDispatch();
  const {
    articleIds,
    sliceDetails,
    activeCategory,
    articlesFrom,
    activePress,
  } = useSelector((state: RootState) => state.articles);

  const loadNextPage = async () => {
    if (sliceDetails.hasNext) {
      const nextPage = sliceDetails.currentPage + 1;

      let newArticles;

      // articlesFrom에 따라 각기 다른 fetch 함수 호출
      switch (articlesFrom) {
        case 'today':
          newArticles = await fetchArticlesByToday({
            category: activeCategory,
            page: nextPage,
          });
          break;

        case 'all':
          newArticles = await fetchArticles({
            category: activeCategory,
            page: nextPage,
          });
          break;

        case 'subscribe':
          newArticles = await getPressArticleList(
            activePress,
            activeCategory,
            nextPage,
          );
          break;

        // case 'folder':
        //   newArticles = await getFolderInfo({
        //     folderId: activeCategory,
        //     page: nextPage,
        //   });
        //   break;

        // case 'history':
        //   newArticles = await getMemberHistoryList(nextPage);
        //   break;

        default:
          throw new Error('Unknown articlesFrom value');
      }

      const newArticleIds =
        newArticles && newArticles.content.map((article: any) => article.id);
      dispatch(setSliceDetail(newArticles.sliceDetails));
      dispatch(setArticleIds([...articleIds, ...newArticleIds]));
    }
  };

  return loadNextPage;
};
