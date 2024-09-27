import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
import { UserInputProps } from 'types/register';
import { MemberInfo } from 'types/api/member';
import { MemberFolderList } from '@/types/api/folder';
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
 * IMP : 사용자 폴더 목록 조회를 위한 API (mypage에서 사용)
 */
export const getMemberFolderList = async (): Promise<MemberFolderList> => {
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
 * IMP : 언론사 구독을 위한 API
 */
export const subscribePress = async (pressId: number): Promise<void> => {
  try {
    const response: AxiosResponse<boolean> = await api.post(
      `${MEMBER_URL}/press/${pressId}`,
    );
    console.log(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 언론사 구독 취소를 위한 API
 */
export const unsubscribePress = async (pressId: number): Promise<void> => {
  try {
    const response: AxiosResponse<boolean> = await api.put(
      `${MEMBER_URL}/press/${pressId}`,
    );
    console.log(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 언론사 구독 목록 조회를 위한 API
 * TODO : 언론사 Type 정의 필요
 */
export const getSubscribedPressList = async (): Promise<void> => {
  try {
    const response: AxiosResponse<boolean> = await api.post(
      `${MEMBER_URL}/press`,
    );
    console.log(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
