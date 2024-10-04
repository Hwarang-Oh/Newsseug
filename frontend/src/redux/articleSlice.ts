import { SliceDetails } from 'types/api/article';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleVideo } from 'types/api/articleVideo';

interface ArticleState {
  articleIds: number[];
  sliceDetails: SliceDetails | {};
  articlesFrom: string;
  activeCategory: string;
  activePress: string | null;
  videoList: { [id: number]: ArticleVideo };
}

const initialArticleState: ArticleState = {
  articleIds: [],
  sliceDetails: {},
  articlesFrom: '',
  activeCategory: 'ALL',
  activePress: null,
  videoList: {},
};

const articleSlice = createSlice({
  name: 'articles',
  initialState: initialArticleState,
  reducers: {
    setArticleIds(state, action: PayloadAction<number[]>) {
      state.articleIds = action.payload;
    },
    setSliceDetail(state, action: PayloadAction<SliceDetails | {}>) {
      state.sliceDetails = action.payload;
    },
    setArticleFrom(state, action: PayloadAction<string>) {
      state.articlesFrom = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
    setActviePress(state, action: PayloadAction<string | null>) {
      state.activePress = action.payload;
    },
    setVideoList(state, action: PayloadAction<{ [id: number]: ArticleVideo }>) {
      state.videoList = {
        ...state.videoList, // 기존 데이터를 유지
        ...action.payload, // 새로운 데이터를 추가
      };
    },
  },
});

export const {
  setArticleIds,
  setSliceDetail,
  setArticleFrom,
  setActiveCategory,
  setActviePress,
  setVideoList,
} = articleSlice.actions;
export default articleSlice.reducer;
