/**
 * IMP : Member에 대한 Type 정의
 * @property {number} id - 회원 ID
 * @property {string} nickname - 닉네임
 * @property {GenderType} gender - 성별
 * @property {Date} birth - 생년월일
 * @property {OAuth2Details} oAuth2Details - OAuth2 정보
 */
export interface Member {
  id: number;
  nickname: string;
  gender: GenderType;
  birth: Date;
  oAuth2Details: OAuth2Details;
}

type GenderType = 'MALE' | 'FEMALE';
type ProviderType = 'KAKAO' | 'GOOGLE';
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
 * IMP : Member의 로그인 결과를 받아오는 Response Type
 * @property {string} timestamp - 요청 시간
 * @property {string} trackId - 트랙 ID
 * @property {boolean} data - 로그인 결과
 */
export interface MemberLoginResponse {
  timestamp: string;
  trackId: string;
  data: boolean;
}

/**
 * IMP : Member의 정보를 받아오는 Response Type
 * @property {string} nickname - 닉네임
 * @property {string} gender - 성별
 * @property {number} age - 나이
 */
export interface MemberInfoResponse {
  nickname: string;
  gender: string;
  age: number;
}
