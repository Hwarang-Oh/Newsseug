import { http, HttpResponse } from 'msw';
import articledummy from 'mocks/_articledummy.json';
const ARTICLE_URL = 'https://j11a301.p.ssafy.io/api/v1/articles';

/**
 * IMP : ArticleAPI Handlers
 * * 1. /articles => 전체 기사 목록 조회
 * * 2. /articles/today => 오늘의 기사 목록 조회
 * * 3. /articles/press/:pressId => 구독 언론사의 기사 목록 조회
 */
export const articleHandlers = [
  http.get(ARTICLE_URL, ({ request }) => {
    const pageNumber =
      Number(new URL(request.url).searchParams.get('pageNumber')) || 1;
    const startIdx = (pageNumber - 1) * 6;
    const endIdx = pageNumber * 6;
    const paginatedArticles = articledummy.articlesPagination.slice(
      startIdx,
      endIdx,
    );
    const hasNextPage = endIdx < articledummy.articlesPagination.length;
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

  http.get(`${ARTICLE_URL}/today`, ({ request }) => {
    const pageNumber =
      Number(new URL(request.url).searchParams.get('pageNumber')) || 1;
    // console.log(pageNumber);
    const startIdx = (pageNumber - 1) * 6;
    const endIdx = pageNumber * 6;
    const paginatedArticles = articledummy.articlesPagination.slice(
      startIdx,
      endIdx,
    );
    const hasNextPage = endIdx < articledummy.articlesPagination.length;
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

  http.get(`${ARTICLE_URL}/press/:pressId?`, ({ request }) => {
    const pageNumber =
      Number(new URL(request.url).searchParams.get('pageNumber')) || 1;
    const startIdx = (pageNumber - 1) * 6;
    const endIdx = pageNumber * 6;
    const paginatedArticles = articledummy.articlesPagination.slice(
      startIdx,
      endIdx,
    );
    const hasNextPage = endIdx < articledummy.articlesPagination.length;
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
