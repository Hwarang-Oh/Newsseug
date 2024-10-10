import memberReducer from './memberSlice';
import subscribeReducer from './subscribeSlice';
import { configureStore } from '@reduxjs/toolkit';
import {
  saveStateToSessionStorage,
  loadStateFromSessionStorage,
} from 'utils/stateUtils';
import throttle from 'lodash.throttle';
import darkModeSlice from './darkModeSlice';
import articleReducer from './articleSlice';

const persistedState = loadStateFromSessionStorage();
export const store = configureStore({
  reducer: {
    member: memberReducer,
    articles: articleReducer,
    subscribedPress: subscribeReducer,
    darkMode: darkModeSlice,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // 미들웨어로 redux-thunk 추가
});

store.subscribe(
  throttle(() => {
    saveStateToSessionStorage(store.getState());
  }, 1000), // 상태 저장을 1초에 한 번으로 제한
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
