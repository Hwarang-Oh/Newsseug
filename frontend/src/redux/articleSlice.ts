import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'types/api/article';

interface ArticleState {
  articles: Article[];
}

const initialState: ArticleState = {
  articles: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;
