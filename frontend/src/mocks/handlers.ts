import { http, HttpResponse } from 'msw';
import press from './pressdummy.json';
import memberinfo from './memberdummy.json';
import memberfolder from './memberfolderdummy.json';
import folder from './folderdummy.json';

const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

let folders = memberfolder;

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

  http.post(BASE_URL + '/folders', async ({ request }) => {
    const data = (await request.json()) as { name: string };
    const { name } = data; // 폴더 이름 추출

    const newFolder = {
      id: memberfolder.folders.length + 1, // id는 폴더 길이로 임시 설정
      name,
      articleCount: 0, // 초기 articleCount는 0
      thumbnailUrl: '#',
    };

    folders.folders.push(newFolder);

    return HttpResponse.json(folders);
  }),
];

export const folderhandles = [
  http.get(BASE_URL + '/folders/:folderId', ({ params }) => {
    const { folderId } = params;

    const folderData = folders.folders.find(
      (folder) => folder.id === Number(folderId),
    );

    if (folderData) {
      return HttpResponse.json(folderData);
    } else {
      return HttpResponse.json(folder);
    }
  }),
];
