import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://j11a301.p.ssafy.io/api/v1';

export const articlelikehandler = [
  http.post(`${BASE_URL}/likes/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} like successfully.`,
    });
  }),
];

export const articledislikehandler = [
  http.delete(`${BASE_URL}/likes/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} dislike successfully.`,
    });
  }),
];

export const articlehatehandler = [
  http.post(`${BASE_URL}/hates/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} hate successfully.`,
    });
  }),
];

export const articledishatehandler = [
  http.delete(`${BASE_URL}/hates/articles/:articleId`, (req) => {
    const { articleId } = req.params; // URL에서 pressId를 추출

    // 응답 생성
    return HttpResponse.json({
      message: `article with ID ${articleId} dishate successfully.`,
    });
  }),
];
