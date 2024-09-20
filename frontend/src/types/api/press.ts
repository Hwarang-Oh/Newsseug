/**
 * IMP : Press에 대한 Type을 정의하고 있습니다.
 * IMP : Java에서 정의된 Type을 TS로 옮긴 형태입니다.
 * TODO : 그러므로, API를 통해 받아오는 데이터의 형식을 정의하고 싶다면, 직접 추가해야 할 수도 있습니다.
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
