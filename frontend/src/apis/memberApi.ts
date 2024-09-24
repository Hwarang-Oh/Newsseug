import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
import { UserInputProps } from 'types/userInput';
import { MemberState } from 'types/api/member';

const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 회원 정보 등록을 위한 API
 * @param input
 * @returns
 */
export const registerMember = async (input: UserInputProps): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await api.put(MEMBER_URL, input);
    console.log('회원가입 결과 : ', response.data);
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
 * IMP : 정보 조회를 위한 API
 * TODO : MOCK DATA로 대체
 */
export const getMemberInfo = async (): Promise<MemberState> => {
  try {
    const response: AxiosResponse<MemberState> = await api.get(MEMBER_URL);
    console.log('회원 정보 : ', response.data);
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
