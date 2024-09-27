import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSubscribedPressList } from 'apis/subscribe';
import { PressInfo } from '@/types/props/subscribe';

// 초기 상태 정의
interface SubscribeState {
  subscribedPress: PressInfo[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscribeState = {
  subscribedPress: [],
  loading: false,
  error: null,
};

// 비동기 액션 생성
export const fetchSubscribedPress = createAsyncThunk(
  'subscribe/fetchSubscribedPress',
  async () => {
    const response = await getSubscribedPressList();
    return response; // 데이터를 반환
  },
);

// slice 생성
const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {
    updateSubscribedPress: (state, action: PayloadAction<PressInfo[]>) => {
      state.subscribedPress = action.payload; // 새로운 구독 리스트로 업데이트
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribedPress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribedPress.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedPress = action.payload;
      })
      .addCase(fetchSubscribedPress.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch subscribed press';
      });
  },
});

// 리듀서 내보내기
export const { updateSubscribedPress } = subscribeSlice.actions;
export default subscribeSlice.reducer;
