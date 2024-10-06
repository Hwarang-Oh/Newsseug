import { http, HttpResponse } from 'msw';
import folderdummy from 'mocks/_folderdummy.json';
import foldereachdummy from 'mocks/_foldereachdummy.json';
import folderresultdummy from 'mocks/_folderresultdummy.json';
const FOLDER_URL = 'https://j11a301.p.ssafy.io/api/v1/folders';

/**
 * IMP : FolderAPI Handlers
 * * 1. GET : /folders => 기사를 저장할 폴더 목록 조회
 * * 2. POST : /folders => 특정 폴더 조회
 * * 3. GET : /folders/:folderId => 특정 폴더 조회
 * * 4. POST : /folders/bookmarks => 기사 저장
 */

let newfolders = folderdummy;
let newmemberfolders = foldereachdummy;
export const folderHandlers = [
  http.get(FOLDER_URL, () => {
    return HttpResponse.json(folderdummy.data);
  }),

  http.post(FOLDER_URL, async ({ request }) => {
    const data = (await request.json()) as { title: string };
    const { title } = data; // 폴더 이름 추출

    const newFolder = {
      id: folderdummy.data.length + 1, // id는 폴더 길이로 임시 설정
      title,
      articles: [],
      thumbnailUrl: '#',
    };

    const newMemberFolder = {
      id: folderdummy.data.length + 1, // id는 폴더 길이로 임시 설정
      title,
      articleCount: 0,
      thumbnailUrl: '#',
    };

    newfolders.data.push(newFolder);
    newmemberfolders.data.content.push(newMemberFolder);
  }),

  http.get(`${FOLDER_URL}/:folderId`, ({ params }) => {
    return HttpResponse.json(folderresultdummy);
  }),

  http.post(`${FOLDER_URL}/bookmarks`, async ({ request }) => {
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
