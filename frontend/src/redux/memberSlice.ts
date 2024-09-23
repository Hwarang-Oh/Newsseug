import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from 'types/api/member';

interface MemberState {
  nickname: string;
  gender: string;
  age: string;
}

const initialState: MemberState = {
  nickname: '노래하는마라샹궈',
  gender: 'MALE',
  age: '27',
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberInfo: (state, action: PayloadAction<MemberState>) => {
      state.nickname = action.payload.nickname;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
    },
    clearMemberInfo: (state) => {
      state.nickname = '';
      state.gender = '';
      state.age = '';
    },
  },
});

export const { setMemberInfo, clearMemberInfo } = memberSlice.actions;
export default memberSlice.reducer;
