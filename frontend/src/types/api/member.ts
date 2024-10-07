import { SliceDetails } from './article';

export type GenderType = 'MALE' | 'FEMALE';
export type ProviderType = 'kakao' | 'google' | 'none';
/**
 * IMP : API와 관련된 Member의 정보를 정의한 Type
 */
export interface MemberState {
  nickname: string;
  gender: string;
  age: number;
  profileImageUrl: string;
}

export interface MemberStore {
  member: MemberState;
  accessToken: string;
  refreshToken: string;
  providerType: ProviderType;
  providerId: string;
}

export interface DecodedToken {
  exp: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// IMP : 회원 정보 조회에 대한 Response Type
export interface MemberInfo {
  nickname: string;
  profileImageUrl: string;
}

export interface MemberHistoryDetail {
  id: number;
  name: string;
  thumbnailUrl: string;
  viewCount: number;
  pressName: string;
}

export interface MemberHistories {
  histories: MemberHistoryDetail[];
}

export interface MemberHistoryInfo {
  content: MemberHistories;
  sliceDetails: SliceDetails;
}
