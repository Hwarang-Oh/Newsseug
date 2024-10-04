import { http, HttpResponse } from 'msw';
import dummy from './allpressdummy.json';

export const allpresshandlers = [
  http.get('https://j11a301.p.ssafy.io/api/v1/press', () => {
    return HttpResponse.json(dummy.press);
  }),
];
