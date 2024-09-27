import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { PressBasic } from 'types/api/press';

const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 언론사 구독 목록 조회를 위한 API
 */
export const getSubscribedPressList = async (): Promise<PressBasic[]> => {
  try {
    const response = await api.get(`${MEMBER_URL}/press`);
    console.log(response.data);
    return response.data.data.press;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 전체 언론사 조회
 */
export const getAllPressList = async (): Promise<PressBasic[]> => {
  try {
    const response = await api.get(`api/v1/press`);
    return response.data.press;
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
export const subscribePress = async (pressId: number) => {
  try {
    const response = await api.post(`${MEMBER_URL}/press/${pressId}`);
    console.log(response);
  } catch (error: unknown) {
    throw error;
  }
};

/**
 * IMP : 언론사 구독 취소를 위한 API
 */
export const unsubscribePress = async (pressId: number) => {
  try {
    const response = await api.put(`${MEMBER_URL}/press/${pressId}`);
    console.log(response);
  } catch (error: unknown) {
    throw error;
  }
};
