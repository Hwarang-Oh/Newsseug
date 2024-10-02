import press from 'mocks/pressdummy.json';
import memberinfo from 'mocks/memberdummy.json';
import memberfolder from 'mocks/memberfolderdummy.json';
import folder from 'mocks/folderdummy.json';
import article from 'mocks/article.json';
import articlePagination from 'mocks/articlePagination.json';
import folders from 'mocks/foldersdummy.json';
import { http, HttpResponse } from 'msw';
const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

let newmemberfolders = memberfolder;
let newfolders = folders;
let pressInfo = press;

export const presshandlers = [
  http.get(BASE_URL + '/press/:pressId', () => {
    return HttpResponse.json(press);
  }),

  // 구독
  http.post(BASE_URL + '/members/press/:pressId', async () => {
    // 구독 상태 변경
    pressInfo.isSubscribed = true;

    // 상태 반환
    return HttpResponse.json(pressInfo);
  }),

  // 구독 취소
  http.put(BASE_URL + '/members/press/:pressId', async () => {
    pressInfo.isSubscribed = false;

    // 상태 반환
    return HttpResponse.json(pressInfo);
  }),
];

export const memberhandlers = [
  http.get(BASE_URL + '/members', () => {
    return HttpResponse.json(memberinfo);
  }),
  http.get(BASE_URL + '/members/folders', () => {
    return HttpResponse.json(memberfolder.data);
  }),
];

export const folderhandles = [
  http.get(BASE_URL + '/folders', () => {
    return HttpResponse.json(folders.data);
  }),

  http.post(BASE_URL + '/folders', async ({ request }) => {
    const data = (await request.json()) as { title: string };
    const { title } = data; // 폴더 이름 추출

    const newFolder = {
      id: memberfolder.data.length + 1, // id는 폴더 길이로 임시 설정
      title,
      articles: [],
      thumbnailUrl: '#',
    };

    const newMemberFolder = {
      id: memberfolder.data.length + 1, // id는 폴더 길이로 임시 설정
      title,
      articleCount: 0,
      thumbnailUrl: '#',
    };

    newfolders.data.push(newFolder);
    newmemberfolders.data.push(newMemberFolder);
  }),
  http.get(BASE_URL + '/folders/:folderId', ({ params }) => {
    return HttpResponse.json(folder);
  }),
  http.post(BASE_URL + '/bookmarks', async ({ request }) => {
    const data = (await request.json()) as {
      folderIds: number[];
      articleId: number;
    };
    const { folderIds, articleId } = data; // folderIds와 articleId 추출

    // 각 폴더 ID에 해당하는 폴더에서 articleId를 추가 또는 제거
    newfolders.data.forEach((folder) => {
      if (folderIds.includes(folder.id)) {
        // folderIds에 포함된 폴더라면 articleId를 추가
        if (!folder.articles.includes(articleId)) {
          folder.articles.push(articleId);
        }
      } else {
        // folderIds에 포함되지 않은 폴더라면 articleId를 제거
        folder.articles = folder.articles.filter((id) => id !== articleId);
      }
    });

    // 최종적으로 수정된 newfolders 데이터 반환
    return HttpResponse.json(newfolders);
  }),
];

export const articlePaginationhandlers = [
  http.get(BASE_URL + '/articles', ({ request }) => {
    const pageNumber =
      Number(new URL(request.url).searchParams.get('page')) || 1;
    const startIdx = (pageNumber - 1) * 6;
    const endIdx = pageNumber * 6;
    const paginatedArticles = articlePagination.articlesPagination.slice(
      startIdx,
      endIdx,
    );
    const hasNextPage = endIdx < articlePagination.articlesPagination.length;
    return HttpResponse.json({
      data: {
        sliceDetails: {
          currentPage: pageNumber,
          hasFirst: pageNumber === 0,
          hasNext: hasNextPage,
        },
        content: paginatedArticles,
      },
    });
  }),
  http.get(BASE_URL + '/articles/today', ({ request }) => {
    const pageNumber =
      Number(new URL(request.url).searchParams.get('page')) || 1;
    const startIdx = (pageNumber - 1) * 6;
    const endIdx = pageNumber * 6;
    const paginatedArticles = articlePagination.articlesPagination.slice(
      startIdx,
      endIdx,
    );
    const hasNextPage = endIdx < articlePagination.articlesPagination.length;
    return HttpResponse.json({
      data: {
        sliceDetails: {
          currentPage: pageNumber,
          hasFirst: pageNumber === 0,
          hasNext: hasNextPage,
        },
        content: paginatedArticles,
      },
    });
  }),
];
