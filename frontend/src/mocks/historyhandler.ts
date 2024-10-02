import { http, HttpResponse } from 'msw';
import dummy from './historydummy.json';

export const mypagehistoryhandler = [
  http.get(
    'https://j11a301.p.ssafy.io/api/v1/interactions/histories?page=1',
    () => {
      return HttpResponse.json(dummy);
    },
  ),
];
