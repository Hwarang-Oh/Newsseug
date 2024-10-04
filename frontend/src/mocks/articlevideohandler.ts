import { http, HttpResponse } from 'msw';
import dummy from './articlevideodummy.json';

export const articlevideohandler = [
  http.get('https://j11a301.p.ssafy.io/api/v1/articles/:articleId', (req) => {
    const { articleId } = req.params;

    const articleData = dummy[articleId as keyof typeof dummy];
    return HttpResponse.json(articleData);
  }),
];
