import { useDispatch } from 'react-redux';
import {
  setActiveCategory,
  setActviePress,
  setArticleFrom,
  setArticlesInfo,
  setFolderId,
  setKeyword,
  setSliceDetail,
} from '../redux/articleSlice';
import { Category, SliceDetails } from 'types/api/article';
import { ArticleListCardProps } from 'types/common/common';

function StoreArticleDispatch(
  dispatch: ReturnType<typeof useDispatch>,
  articleList: ArticleListCardProps[],
  sliceDetails: SliceDetails | {},
  articleFrom: string,
  activeCategory?: string,
  activePress?: number | null,
  folerId?: number | null,
  keyword?: string,
) {
  const articleInfo = articleList.map((article) => {
    return {
      id: article.id,
      thumbnailUrl: article.thumbnailUrl,
    };
  });
  dispatch(setArticlesInfo(articleInfo));
  dispatch(setSliceDetail(sliceDetails));
  dispatch(setArticleFrom(articleFrom));
  dispatch(
    setActiveCategory(Category[activeCategory as keyof typeof Category]),
  );
  dispatch(setActviePress(activePress ?? null));
  dispatch(setFolderId(folerId ?? null));
  dispatch(setKeyword(keyword ?? null));
}

export default StoreArticleDispatch;
