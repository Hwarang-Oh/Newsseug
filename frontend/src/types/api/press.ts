/**
 * IMP : Press Type 정의
 * @property {number} pressId - 언론사 ID
 * @property {PressBranding} pressBranding - 언론사 브랜딩
 * @property {string} description - 언론사 설명
 * @property {number} subscribeCount - 구독자 수
 */
export interface Press {
  pressId: number;
  pressBranding: PressBranding;
  description: string;
  subscribeCount: number;
}

interface PressBranding {
  name: string;
  imageUrl: string;
}

export interface PressDetail extends PressBranding {
  pressId: number;
  description: string;
  subscribeCount: number;
}
