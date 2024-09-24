import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemberState } from 'types/api/member';

const initialState: MemberState = {
  nickname: '노래하는마라샹궈',
  gender: 'MALE',
  age: 27,
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
  },
});

export const { setMemberInfo } = memberSlice.actions;
export default memberSlice.reducer;
