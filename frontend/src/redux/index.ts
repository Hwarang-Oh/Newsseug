import throttle from 'lodash.throttle';
import memberReducer from './memberSlice';
import articleReducer from './articleSlice';
import { configureStore } from '@reduxjs/toolkit';
import {
  saveStateToSessionStorage,
  loadStateFromSessionStorage,
} from 'utils/stateUtils';

const persistedState = loadStateFromSessionStorage();

export const store = configureStore({
  reducer: {
    member: memberReducer,
    memberFolder: memberFolderReducer,
    article: articleReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(
  throttle(() => {
    saveStateToSessionStorage(store.getState());
  }, 1000), // 상태 저장을 1초에 한 번으로 제한
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
