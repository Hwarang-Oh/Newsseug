import { http, HttpResponse } from 'msw';
import searchdummy from 'mocks/_searchresultdummy.json';
const SEARCH_URL = 'https://j11a301.p.ssafy.io/api/v1/search';

export const searchHandlers = [
  http.get(SEARCH_URL, () => {
    return HttpResponse.json(searchdummy.data);
  }),
];
