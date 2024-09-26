import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './memberSlice';
import articleReducer from './articleSlice';
import memberFolderReducer from './memberFolderSlice';

export const store = configureStore({
  reducer: {
    member: memberReducer,
    memberFolder: memberFolderReducer,
    article: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
