import { useDispatch, useSelector } from 'react-redux';
import { setArticleIds, setSliceDetail } from '../redux/articleSlice';
import { RootState } from '../redux/index';
import {
  fetchArticles,
  fetchArticlesByToday,
  fetchArticlesByPress,
} from 'apis/articleApi';
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
    folderId,
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

        case 'press':
          newArticles = await fetchArticlesByPress({
            category: activeCategory,
            page: nextPage,
            pressId: activePress,
          });
          break;

        case 'folder': {
          const articles = await getFolderInfo(folderId, nextPage);
          newArticles = articles.articles;
          break;
        }

        case 'history':
          newArticles = await getMemberHistoryList(nextPage);
          break;

        default:
          throw new Error('Unknown articlesFrom value');
      }

      let newArticleIds = [];

      if (newArticles) {
        newArticleIds = newArticles.content.map((article: any) => article.id);
      }
      dispatch(setSliceDetail(newArticles.sliceDetails));
      dispatch(setArticleIds([...articleIds, ...newArticleIds]));
    }
  };

  return loadNextPage;
};
