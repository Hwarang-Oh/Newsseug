import { http, HttpResponse } from 'msw';
import dummy from './historydummy.json';

export const pressarticlehandler = [
  http.get('https://j11a301.p.ssafy.io/api/v1/articles/press/1', () => {
    return HttpResponse.json(dummy);
  }),
];
