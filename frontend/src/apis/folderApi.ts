import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
const FOLDERS_URL = `/api/v1/folders`;

/**
 * IMP : 사용자 폴더 목록 조회를 위한 API
 * TODO : 폴더 Type 정의 필요
 */
export const getFolderList = async (): Promise<void> => {
  try {
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 사용자 폴더 생성을 위한 API
 */
export const createFolder = async (): Promise<void> => {
  try {
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
export const getArticleListInFolder = async (
  folderId: number,
): Promise<void> => {
  try {
    const response: AxiosResponse<boolean> = await api.get(
      `${FOLDERS_URL}/${folderId}`,
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
