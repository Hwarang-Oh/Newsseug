import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { PressInfo } from 'types/subscribe';

const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 언론사 구독 목록 조회를 위한 API
 */
export const getSubscribedPressList = async (): Promise<PressInfo[]> => {
  try {
    const response = await api.get(`${MEMBER_URL}/press`);
    console.log(response.data.data);
    return response.data.data.press;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
