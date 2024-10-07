import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemberState, MemberStore, ProviderType } from 'types/api/member';

const initialState: MemberStore = {
  member: { nickname: '', gender: 'MALE', age: 27, profileImageUrl: '' },
  accessToken: '',
  refreshToken: '',
  providerType: 'none',
  providerId: '',
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberInfo: (state, action: PayloadAction<MemberState>) => {
      state.member.nickname = action.payload.nickname;
      state.member.gender = action.payload.gender;
      state.member.age = action.payload.age;
      state.member.profileImageUrl = action.payload.profileImageUrl;
    },
    setProviderInfo: (
      state,
      action: PayloadAction<{
        AccessToken: string;
        RefreshToken: string;
        providerId: string;
      }>,
    ) => {
      state.accessToken = action.payload.AccessToken;
      state.refreshToken = action.payload.RefreshToken;
      state.providerId = action.payload.providerId;
    },
    setProviderType: (state, action: PayloadAction<ProviderType>) => {
      state.providerType = action.payload;
    },
  },
});

export const { setMemberInfo, setProviderInfo, setProviderType } =
  memberSlice.actions;
export default memberSlice.reducer;
