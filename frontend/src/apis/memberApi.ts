import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { UserInputProps } from 'types/props/register';
import { MemberFolder } from 'types/api/folder';
import { PageType } from 'types/api/article';
import { MemberInfo } from 'types/api/member';
const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 회원 정보 등록을 위한 API
 * @requestBody input
 * @returns data : boolean
 */
export const registerMember = async (
  input: UserInputProps,
): Promise<boolean> => {
  try {
    const resonse = await api.put(MEMBER_URL, input);
    return resonse.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 회원 정보 조회를 위한 API
 * @param null => AccessToken을 통해 조회
 * @returns MemberInfo Type
 */
export const getMemberInfo = async (): Promise<MemberInfo> => {
  try {
    const response = await api.get(MEMBER_URL);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else {
        console.error('사용자 정보 조회 실패:', error);
        throw error;
      }
    } else throw error;
  }
};

/**
 * IMP : 사용자 폴더 목록 조회를 위한 API
 */
export const getMemberFolderList = async (
  page: number,
): Promise<MemberFolder> => {
  try {
    const response = await api.get(`${MEMBER_URL}/folders`, {
      params: { pageNumber: page },
    });
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
 * IMP : 사용자 시청 기록 조회를 위한 API
 */
export const getMemberHistoryList = async ({
  page = 1,
}: {
  page: number;
}): Promise<PageType> => {
  try {
    const response = await api.get(`/api/v1/histories`, {
      params: { page },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else {
        console.error('시청 기록 조회 실패:', error);
        throw error;
      }
    } else throw error;
  }
};
