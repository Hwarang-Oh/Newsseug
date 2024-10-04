import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setActiveCategory,
  setActviePress,
  setArticleFrom,
  setArticleIds,
  setSliceDetail,
} from '../redux/articleSlice';
import { Category, SliceDetails } from 'types/api/article';
import { ArticleListCardProps } from 'types/common/common';

/**
 * Articles 관련 Redux 상태 업데이트를 처리하는 훅
 * @param articleList - 불러온 기사 리스트
 * @param sliceDetails - 페이지네이션 슬라이스 정보
 * @param sectionType - 섹션 타입
 * @param activeCategory - 활성화된 카테고리
 */

function useStoreArticleDispatch(
  articleList: ArticleListCardProps[],
  sliceDetails: SliceDetails | {},
  articleFrom: string,
  activeCategory?: string,
  activePress?: string,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setArticleIds(articleList.map((article) => article.id)));
    dispatch(setSliceDetail(sliceDetails));
    dispatch(setArticleFrom(articleFrom));
    dispatch(
      setActiveCategory(Category[activeCategory as keyof typeof Category]),
    );
    dispatch(setActviePress(activePress || null));
  }, [articleList, sliceDetails, articleFrom, activeCategory, dispatch]);
}

export default useStoreArticleDispatch;
