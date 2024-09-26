import { Folder, FolderList, MemberFolderList } from 'types/api/folder';
import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
const FOLDERS_URL = `/api/v1/folders`;

/**
 * IMP : 사용자 폴더 목록 조회를 위한 API
 */
export const getFolderList = async (): Promise<FolderList> => {
  try {
    const response: AxiosResponse<FolderList> = await api.get(`${FOLDERS_URL}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else {
        console.error('폴더 목록 조회 실패:', error);
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
): Promise<MemberFolderList> => {
  try {
    const response = await api.post(`${FOLDERS_URL}`, { name: folderName });
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
  folderId: number,
  articleId: number,
): Promise<void> => {
  try {
    const response: AxiosResponse<boolean> = await api.post(
      `${FOLDERS_URL}/${folderId}/articles/${articleId}`,
    );
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
export const getFolderInfo = async (folderId: number): Promise<Folder> => {
  try {
    const response = await api.get(`${FOLDERS_URL}/${folderId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
