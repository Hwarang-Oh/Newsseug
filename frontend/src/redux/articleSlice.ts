import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'types/api/article';

// TODO : 현재 시청하고 있는 Article List에 대한 상태 관리
interface CurrentArticleList {
  ArticleList: Article[];
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
    setCurrentArticles: (state, action: PayloadAction<Article[]>) => {
      state.ArticleList = action.payload;
    },
  },
});

export const { setCurrentArticles } = articleSlice.actions;
export default articleSlice.reducer;
