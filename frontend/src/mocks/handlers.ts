import press from 'mocks/pressdummy.json';
import memberinfo from 'mocks/memberdummy.json';
import memberfolder from 'mocks/memberfolderdummy.json';
import folder from 'mocks/folderdummy.json';
import article from 'mocks/article.json';
import { http, HttpResponse } from 'msw';
const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

let folders = memberfolder;
let pressInfo = press;

export const presshandlers = [
  http.get(BASE_URL + '/press/:pressId', () => {
    return HttpResponse.json(press);
  }),

  // 구독
  http.post(
    BASE_URL + '/members/press/:pressId',
    async ({ request, params }) => {
      const { pressId } = params;

      // JSON 데이터 처리
      const requestData = await request.json(); // request.json() 사용
      console.log('구독 요청 받은 언론사 ID:', pressId);

      // 구독 상태 변경
      pressInfo.isSubscribed = true;

      // 상태 반환
      return HttpResponse.json(pressInfo);
    },
  ),

  // 구독 취소
  http.put(
    BASE_URL + '/members/press/:pressId',
    async ({ request, params }) => {
      const { pressId } = params;

      // 구독 취소 상태 변경
      console.log('구독 취소 요청 받은 언론사 ID:', pressId);

      pressInfo.isSubscribed = false;

      // 상태 반환
      return HttpResponse.json(pressInfo);
    },
  ),
];

export const memberhandlers = [
  http.get(BASE_URL + '/members', () => {
    return HttpResponse.json(memberinfo);
  }),
];

export const memberfolderhandles = [
  http.get(BASE_URL + '/folders', () => {
    return HttpResponse.json(memberfolder);
  }),

  http.post(BASE_URL + '/folders', async ({ request }) => {
    const data = (await request.json()) as { title: string };
    const { title } = data; // 폴더 이름 추출

    const newFolder = {
      id: memberfolder.folders.length + 1, // id는 폴더 길이로 임시 설정
      title,
      articleCount: 0, // 초기 articleCount는 0
      thumbnailUrl: '#',
    };

    folders.folders.push(newFolder);

    return HttpResponse.json(folders);
  }),
];

export const folderhandles = [
  http.get(BASE_URL + '/folders/:folderId', ({ params }) => {
    return HttpResponse.json(folder);
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
