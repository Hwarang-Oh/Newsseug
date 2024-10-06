import { http, HttpResponse } from 'msw';
import pressdummy from 'mocks/_pressdummy.json';
import presseachdumy from 'mocks/_presseachdummy.json';
import subscribepressdummy from 'mocks/_subscribepressdummy.json';
const PRESS_URL = 'https://j11a301.p.ssafy.io/api/v1/press';
const MEMBER_URL = 'https://j11a301.p.ssafy.io/api/v1/members';

/**
 * IMP : Subscribe Handlers
 * * 1. /press => 전체 언론사 목록 조회
 * * 2. /press/:pressId => 특정 언론사의 정보 조회
 * * 3. /members/press => 회원의 구독 언론사 목록 조회
 * * 4. POST /members/press/:pressId => 회원의 언론사 구독
 * * 5. DELETE /members/press/:pressId => 회원의 언론사 구독 취소
 * ! 1개만 있던 실제 PressAPI를 subscribeAPI Handlers 쪽으로 옮김
 */
export const subscribeHandlers = [
  http.get(PRESS_URL, () => {
    return HttpResponse.json(pressdummy.press);
  }),

  http.get(`${PRESS_URL}/:pressId`, () => {
    return HttpResponse.json(presseachdumy);
  }),

  http.get(`${MEMBER_URL}/press`, () => {
    return HttpResponse.json(subscribepressdummy);
  }),

  http.post(`${MEMBER_URL}/press/:pressId`, (req) => {
    const { pressId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `Press with ID ${pressId} subscribed successfully.`,
    });
  }),

  http.delete(`${MEMBER_URL}/press/:pressId`, (req) => {
    const { pressId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `Press with ID ${pressId} unsubscribed successfully.`,
    });
  }),
];
