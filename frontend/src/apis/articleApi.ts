import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
const ARTICLES_URL = `/api/v1/articles`;

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * IMP : Article을 상황에 맞게 Fetch하는 API를 구현하고 있음. Mock Data로 dummy.json을 사용하고 있음.
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 */

/**
 * IMP : Article을 가져오는 API ( Pagination & Infinite Scroll Version )
 * TODO : Pagination & Infinite Scroll을 위한 API 구현
 * TODO : React Query를 사용하여, 최적화를 고려해야 한다.
 * TODO : 이와 관련한 Dummy Data를 구현해야 한다.
 */
export const fetchArticlesByPage = async ({
  category = null,
  page = 1,
}: {
  category?: string | null;
  page: number;
}) => {
  try {
    const response = await api.get(ARTICLES_URL, {
      params: { category: category || null, page },
    });
    return response.data.content;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

export const fetchTodayArticlesByPage = async ({
  category,
  pageParam,
}: {
  category?: string;
  pageParam: number;
}) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await api.get(`${ARTICLES_URL}/today`, {
      params: { category: category || null, page: pageParam },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
