import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSubscribedPressList } from 'apis/subscribe';
import { PressBasic } from 'types/api/press';

// 초기 상태 정의
interface SubscribeState {
  subscribedPress: PressBasic[];
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
    updateSubscribedPress: (state, action: PayloadAction<PressBasic[]>) => {
      state.subscribedPress = action.payload; // 새로운 구독 리스트로 업데이트
    },
    addPress: (state, action: PayloadAction<PressBasic>) => {
      state.subscribedPress.push(action.payload); // 구독 리스트에 추가
    },
    removePress: (state, action: PayloadAction<number>) => {
      // 해당 언론사 ID를 구독 리스트에서 제거
      state.subscribedPress = state.subscribedPress.filter(
        (press) => press.id !== action.payload,
      );
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
          action.error.message ?? 'Failed to fetch subscribed press';
      });
  },
});

// 리듀서 내보내기
export const { updateSubscribedPress, addPress, removePress } =
  subscribeSlice.actions;
export default subscribeSlice.reducer;
