import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MemberState,
  MemberInfo,
  MemberStore,
  ProviderType,
} from 'types/api/member';
import { CalculateAge } from 'utils/formUtils';
import { getMemberInfo } from 'apis/memberApi';

const initialState: MemberStore = {
  member: { nickname: '', gender: '', age: null, profileImageUrl: '' },
  accessToken: '',
  refreshToken: '',
  providerType: 'none',
  providerId: '',
};

export const fetchMemberInfo = createAsyncThunk<MemberInfo>(
  'member/fetchMemberInfo',
  async () => {
    const response = await getMemberInfo();
    return response;
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchMemberInfo.fulfilled, (state, action) => {
      state.member = {
        nickname: action.payload.nickname,
        gender: action.payload.gender,
        age: CalculateAge(action.payload.birth),
        profileImageUrl: action.payload.profileImageUrl,
      };
    });
  },
});

export const { setMemberInfo, setProviderInfo, setProviderType } =
  memberSlice.actions;
export default memberSlice.reducer;
