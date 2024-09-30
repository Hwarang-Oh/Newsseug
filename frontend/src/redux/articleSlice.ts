import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleInfo } from 'types/api/articleVideo';

// TODO : 현재 시청하고 있는 Article List에 대한 상태 관리
interface CurrentArticleList {
  ArticleList: ArticleInfo[];
  pastArticleId: number;
  currentArticleId: number;
  nextArticleId: number;
}

const initialState: CurrentArticleList = {
  ArticleList: [],
  pastArticleId: 0,
  currentArticleId: 0,
  nextArticleId: 0,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setCurrentArticles: (state, action: PayloadAction<ArticleInfo[]>) => {
      state.ArticleList = action.payload;
    },
  },
});

export const { setCurrentArticles } = articleSlice.actions;
export default articleSlice.reducer;
