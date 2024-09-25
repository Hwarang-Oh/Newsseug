import { http, HttpResponse } from 'msw';
import dummydata from './pressdummy.json';

export const presshandlers = [
  http.get('https://j11a301.p.ssafy.io/api/v1/press/1', () => {
    return HttpResponse.json(dummydata);
  }),
];
