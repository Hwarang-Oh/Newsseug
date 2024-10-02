import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { UserInputProps } from 'types/props/register';
import { MemberHistoryInfo, MemberInfo } from 'types/api/member';
import { MemberFolderInfo } from 'types/api/folder';
const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 회원 정보 등록을 위한 API
 * @param input
 * @returns
 */
export const registerMember = async (
  input: UserInputProps,
): Promise<boolean> => {
  try {
    const {
      data: { data: registerResult },
    } = await api.put(MEMBER_URL, input);
    return registerResult;
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
export const getMemberFolderList = async (): Promise<MemberFolderInfo[]> => {
  try {
    const response = await api.get(`${MEMBER_URL}/folders`);
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
export const getMemberHistoryList = async (
  page: number,
): Promise<MemberHistoryInfo> => {
  try {
    const response = await api.get(
      `api/v1/interactions/histories?page=${page}`,
    );
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
