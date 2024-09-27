export type GenderType = 'MALE' | 'FEMALE';
export type ProviderType = 'kakao' | 'google' | 'none';
type Role = 'ROLE_MEMBER' | 'ROLE_ADMIN';

export interface MemberState {
  nickname: string;
  gender: string;
  age: number;
}
export interface MemberStore {
  member: MemberState;
  AccessToken: string;
  providerType: ProviderType;
  providerId: string;
}

export interface MemberInfo {
  nickname: string;
  profileImageUrl: string;
}

export interface DecodedToken {
  // IMP : 더 추가될 수 있음
  exp: number; // 만료 시간
}
