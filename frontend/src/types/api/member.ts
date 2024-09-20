/**
 * IMP : Member에 대한 Type을 정의하고 있습니다.
 * IMP : GenderType, ProviderType, Role은 ENUM 타입으로 Union Literal을 사용하고 있어, type Keyword를 사용했습니다.
 * IMP : Java에서 정의된 Type을 TS로 옮긴 형태입니다.
 * TODO : 그러므로, API를 통해 받아오는 데이터의 형식을 정의하고 싶다면, 직접 추가해야 할 수도 있습니다.
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
 * * INFO : 이것은 FE 개발자가 직접 추가한 Type입니다.
 */
export interface MemberLoginResponse {
  timestamp: string;
  trackId: string;
  data: boolean;
}
