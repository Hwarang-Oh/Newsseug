import { http, HttpResponse } from 'msw';
import articlevideodummy from 'mocks/_articlevideodummy.json';
const ARTICLE_URL = 'https://j11a301.p.ssafy.io/api/v1/articles';
const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

/**
 * IMP : ArticleVideoAPI Handlers
 * * 1. /articles/:articleId => 특정 기사의 비디오 정보 조회
 * * 2. POST : /likes/articles/:articleId => 기사 좋아요
 * * 3. DELETE : /likes/articles/:articleId => 기사 좋아요 취소
 * * 4. POST : /hates/articles/:articleId => 기사 싫어요
 * * 5. DELETE : /hates/articles/:articleId => 기사 싫어요 취소
 * * 6. POST : /api/v1/reports/articles/:articleId => 기사 신고
 */
export const articleVideoHandlers = [
  http.get('https://j11a301.p.ssafy.io/api/v1/articles/:articleId', (req) => {
    const { articleId } = req.params;

    const articleData =
      articlevideodummy[articleId as keyof typeof articlevideodummy];
    return HttpResponse.json(articleData);
  }),

  http.post(`${BASE_URL}/likes/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} like successfully.`,
    });
  }),

  http.delete(`${BASE_URL}/likes/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} dislike successfully.`,
    });
  }),

  http.post(`${BASE_URL}/hates/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} hate successfully.`,
    });
  }),

  http.delete(`${BASE_URL}/hates/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} dishate successfully.`,
    });
  }),

  http.post(`${BASE_URL}/reports/articles/:articleId`, (req) => {
    return HttpResponse.json({
      data: true,
    });
  }),
];
