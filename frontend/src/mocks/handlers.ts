import press from 'mocks/pressdummy.json';
import memberinfo from 'mocks/memberdummy.json';
import memberfolder from 'mocks/memberfolderdummy.json';
import folder from 'mocks/folderdummy.json';
import article from 'mocks/article.json';
import { http, HttpResponse } from 'msw';
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

export const articlehandlers = [
  http.get(BASE_URL + '/articles', ({ request }) => {
    const url = new URL(request.url);
    const categoryName = url.searchParams.get('categoryName');
    const foundArticles = article.articleByCategory.filter(
      (a) => a.category === categoryName,
    );
    console.log(foundArticles[0].articleList);
    return HttpResponse.json(foundArticles[0].articleList);
  }),

  // 오늘 뉴스 기사 조회 API
  http.get(BASE_URL + '/articles/today', () => {
    return HttpResponse.json(article.todayArticles);
  }),

  // 단일 기사 조회 API (articleId)
  http.get(BASE_URL + '/articles/{articleId}', (req) => {
    const { articleId } = req.params;
    const foundArticle = article.targetArticles.find(
      (a) => a.id === Number(articleId),
    );
    return HttpResponse.json(foundArticle || {});
  }),

  // 전체 기사 조회 API
  http.get(BASE_URL + '/articles/all', () => {
    return HttpResponse.json(article.articles);
  }),
];
