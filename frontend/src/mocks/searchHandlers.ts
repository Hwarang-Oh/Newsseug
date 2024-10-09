import { http, HttpResponse } from 'msw';
import searchdummy from 'mocks/_searchresultdummy.json';
import essearchdummy from 'mocks/_essearchresult.json';
const SEARCH_URL = 'https://j11a301.p.ssafy.io/api/v1/search';

export const searchHandlers = [
  http.get(SEARCH_URL, () => {
    return HttpResponse.json(searchdummy.data);
  }),

  http.get(SEARCH_URL + '/es', () => {
    return HttpResponse.json(essearchdummy.data);
  }),
];
