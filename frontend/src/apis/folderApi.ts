import api from 'apis/commonApi';
import { FolderDetail, FolderInfo, MemberFolderInfo } from 'types/api/folder';
import { isAxiosError } from 'axios';
const FOLDERS_URL = `/api/v1/folders`;

/**
 * IMP : 사용자 폴더 목록 조회를 위한 API
 */
export const getFolderList = async (): Promise<FolderInfo[]> => {
  try {
    const response = await api.get(`${FOLDERS_URL}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else {
        console.error('마이페이지 폴더 목록 조회 실패:', error);
        throw error;
      }
    } else throw error;
  }
};

/**
 * IMP : 사용자 폴더 생성을 위한 API
 */
export const createFolder = async (
  folderName: string,
): Promise<MemberFolderInfo[]> => {
  try {
    const response = await api.post(`${FOLDERS_URL}`, { title: folderName });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 사용자가 기사를 폴더에 저장하는 API
 */
export const saveArticleToFolder = async (
  folderIds: number[],
  articleId: number,
): Promise<void> => {
  try {
    await api.post(`/api/v1/bookmarks`, {
      folderIds,
      articleId,
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 사용자가 폴더에 저장한 기사 목록을 조회하는 API
 */
export const getFolderInfo = async (
  folderId: number,
  pageParam: number,
): Promise<FolderDetail> => {
  try {
    const response = await api.get(`${FOLDERS_URL}/${folderId}`, {
      params: { pageNumber: pageParam },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
