import { http, HttpResponse } from 'msw';
import memberdummy from 'mocks/_memberdummy.json';
import foldereachdummy from 'mocks/_foldereachdummy.json';
import historydummy from 'mocks/_historydummy.json';
const MEMBER_URL = 'https://j11a301.p.ssafy.io/api/v1/members';
const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

/**
 * IMP : MemberAPI Handlers
 * * 1. Get /members : Member의 정보를 조회한다.
 * * 2. Get /members/folders : Member의 폴더 정보를 조회한다.
 * * 3. Get /interactions/histories?page=1 : Member의 히스토리 정보를 조회한다.
 * ! 2번과 3번 API는 약간 중복과 분류 문제가 존재한다.
 */
export const memberHandlers = [
  http.get(MEMBER_URL, () => {
    return HttpResponse.json(memberdummy);
  }),

  http.get(`${MEMBER_URL}/folders`, () => {
    return HttpResponse.json(foldereachdummy.data);
  }),

  http.get(`${BASE_URL}/histories`, () => {
    return HttpResponse.json(historydummy);
  }),
];
