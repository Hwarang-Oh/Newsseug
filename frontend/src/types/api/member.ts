/**
 * IMP : Member에 대한 Type 정의
 * @property {number} id - 회원 ID
 * @property {string} nickname - 닉네임
 * @property {GenderType} gender - 성별
 * @property {Date} birth - 생년월일
 * @property {OAuth2Details} oAuth2Details - OAuth2 정보
 */
interface Member {
  id: number;
  nickname: string;
  gender: GenderType;
  birth: Date;
  oAuth2Details: OAuth2Details;
}

export type GenderType = 'MALE' | 'FEMALE';
export type ProviderType = 'kakao' | 'google' | 'none';
type Role = 'ROLE_MEMBER' | 'ROLE_ADMIN';

interface OAuth2Details {
  providerType: ProviderType;
  providerId: string;
  role: Role;
}

interface History {
  historyId: number;
  memberId: number;
  articleId: number;
  playTime: number;
  createdAt: Date;
}

/**
 * IMP : 아래는 FE 개발자가 직접 추가한 Type입니다.
 */

/**
 * IMP : Member의 정보를 받아오는 Response Type
 * @property {string} nickname - 닉네임
 * @property {string} gender - 성별
 * @property {number} age - 나이
 */
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
