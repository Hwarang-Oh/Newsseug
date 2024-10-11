import { useDispatch, useSelector } from 'react-redux';
import { setArticlesInfo, setSliceDetail } from '../redux/articleSlice';
import { RootState } from '../redux/index';
import {
  fetchArticles,
  fetchArticlesByToday,
  fetchArticlesByPress,
  fetchRandomArticles,
  fetchArticlesByAge,
} from 'apis/articleApi';
import { getFolderInfo } from 'apis/folderApi';
import { getMemberHistoryList } from 'apis/memberApi';
import { getSearchResult } from 'apis/searchApi';
import { ArticleListCardProps } from 'types/common/common';

export const useLoadNextPage = () => {
  const dispatch = useDispatch();
  const {
    articleIds,
    articlesInfo,
    sliceDetails,
    activeCategory,
    articlesFrom,
    activePress,
    folderId,
    keyword,
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

        case 'age':
          newArticles = await fetchArticlesByAge({
            page: nextPage,
          });
          break;

        case 'newsseug':
          newArticles = await fetchRandomArticles();
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

        case 'search': {
          const articles = await getSearchResult({
            keywordText: keyword,
            pageNumber: nextPage,
            category: activeCategory,
          });
          newArticles = articles.articles;
          break;
        }

        default:
          throw new Error('Unknown articlesFrom value');
      }

      let newArticlesInfo = [];

      if (newArticles) {
        newArticlesInfo = newArticles.content.map(
          (article: ArticleListCardProps) => {
            return {
              id: article.id,
              thumbnailUrl: article.thumbnailUrl,
            };
          },
        );
      }
      dispatch(setSliceDetail(newArticles.sliceDetails));
      dispatch(setArticlesInfo([...articlesInfo, ...newArticlesInfo]));
    }
  };

  return loadNextPage;
};
