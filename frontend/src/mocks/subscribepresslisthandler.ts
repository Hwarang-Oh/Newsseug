import { http, HttpResponse } from 'msw';
import dummy from './subscribepressdummy.json';

export const subscribepresslisthandler = [
  http.get('https://j11a301.p.ssafy.io/api/v1/members/press', () => {
    return HttpResponse.json(dummy);
  }),
];
