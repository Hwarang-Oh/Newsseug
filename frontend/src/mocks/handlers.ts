import { http, HttpResponse } from 'msw';
import press from './pressdummy.json';
import memberinfo from './memberdummy.json';
import memberfolder from './memberfolderdummy.json';
import folder from './folderdummy.json';

const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

export const presshandlers = [
  http.get(BASE_URL + '/press/:pressId', () => {
    return HttpResponse.json(press);
  }),
];

export const memberhandlers = [
  http.get(BASE_URL + '/members', () => {
    return HttpResponse.json(memberinfo);
  }),
];

export const memberfolderhandles = [
  http.get(BASE_URL + '/members/folders', () => {
    return HttpResponse.json(memberfolder);
  }),
];

export const folderhandles = [
  http.get(BASE_URL + '/folders/:folderId', () => {
    return HttpResponse.json(folder);
  }),
];
