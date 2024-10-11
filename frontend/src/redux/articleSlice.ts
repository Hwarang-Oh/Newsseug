import { SliceDetails } from 'types/api/article';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArticleInfoType {
  id: number;
  thumbnailUrl: string;
}

interface ArticleState {
  articlesInfo: ArticleInfoType[];
  sliceDetails: SliceDetails | {};
  articlesFrom: string;
  activeCategory: string;
  activePress: number | null;
  folderId: number | null;
  keyword: string | null;
}

const initialArticleState: ArticleState = {
  articlesInfo: [],
  sliceDetails: {},
  articlesFrom: '',
  activeCategory: 'ALL',
  activePress: null,
  folderId: null,
  keyword: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState: initialArticleState,
  reducers: {
    setArticlesInfo(state, action: PayloadAction<ArticleInfoType[]>) {
      state.articlesInfo = action.payload;
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
    setActviePress(state, action: PayloadAction<number | null>) {
      state.activePress = action.payload;
    },
    setFolderId(state, action: PayloadAction<number | null>) {
      state.folderId = action.payload;
    },
    setKeyword(state, action: PayloadAction<string | null>) {
      state.keyword = action.payload;
    },
  },
});

export const {
  setArticlesInfo,
  setSliceDetail,
  setArticleFrom,
  setActiveCategory,
  setActviePress,
  setFolderId,
  setKeyword,
} = articleSlice.actions;
export default articleSlice.reducer;
