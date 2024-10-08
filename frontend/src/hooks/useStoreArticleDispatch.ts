import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setActiveCategory,
  setActviePress,
  setArticleFrom,
  setArticleIds,
  setFolderId,
  setKeyword,
  setSliceDetail,
} from '../redux/articleSlice';
import { Category, SliceDetails } from 'types/api/article';
import { ArticleListCardProps } from 'types/common/common';

function useStoreArticleDispatch(
  articleList: ArticleListCardProps[],
  sliceDetails: SliceDetails | {},
  articleFrom: string,
  activeCategory?: string,
  activePress?: number | null,
  folerId?: number | null,
  keyword?: string,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setArticleIds(articleList.map((article) => article.id)));
    dispatch(setSliceDetail(sliceDetails));
    dispatch(setArticleFrom(articleFrom));
    dispatch(
      setActiveCategory(Category[activeCategory as keyof typeof Category]),
    );
    dispatch(setActviePress(activePress ?? null));
    dispatch(setFolderId(folerId ?? null));
    dispatch(setKeyword(keyword ?? null));
  }, [
    articleList,
    sliceDetails,
    articleFrom,
    activeCategory,
    activePress,
    folerId,
    keyword,
    dispatch,
  ]);
}

export default useStoreArticleDispatch;
