import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MemberState,
  MemberInfo,
  MemberStore,
  ProviderType,
} from 'types/api/member';
import { CalculateAge } from 'utils/formUtils';
import { getMemberInfo } from 'apis/memberApi';
import { getLogout } from 'apis/loginApi';

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

export const logout = createAsyncThunk<
  boolean,
  void,
  { state: { member: MemberStore } }
>('member/logout', async (_, thunkAPI) => {
  const state = thunkAPI.getState(); // Redux state 가져오기
  const providerId = state.member.providerId;
  const response = await getLogout(providerId); // API 요청에 providerId 사용
  return response;
});

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
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload) {
        state.member = {
          nickname: '',
          gender: '',
          age: null,
          profileImageUrl: '',
        };
        state.accessToken = '';
        state.refreshToken = '';
        state.providerType = 'none';
        state.providerId = '';
      }
    });
  },
});

export const { setMemberInfo, setProviderInfo, setProviderType } =
  memberSlice.actions;
export default memberSlice.reducer;
