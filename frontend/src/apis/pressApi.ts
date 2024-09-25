import { PressDetail } from 'types/api/press';
import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
const PRESS_URL = `/api/v1/press`;

/**
 * IMP : 언론사 전체 목록 조회를 위한 API
 */
export const getPressList = async (): Promise<void> => {
  try {
    const response: AxiosResponse<boolean> = await api.get(PRESS_URL);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 언론사 상세 조회를 위한 API
 */
export const getPressDetail = async (pressId: number): Promise<PressDetail> => {
  try {
    const response = await api.get(`${PRESS_URL}/${pressId}`);
    return response.data;
  } catch (error) {
    console.error('언론사 정보 조회 실패:', error);
    throw error;
  }
};
