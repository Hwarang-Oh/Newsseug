import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { PageParamsType, PageType } from 'types/api/article';
const ARTICLES_URL = `/api/v1/articles`;

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * IMP : Article을 상황에 맞게 Fetch하는 API를 구현하고 있음. Mock Data로 dummy.json을 사용하고 있음.
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 */

export const fetchArticles = async ({
  category = 'ALL',
  page = 0,
}: PageParamsType): Promise<PageType> => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await api.get(ARTICLES_URL, {
      params: { pageNumber: page, filter: category },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

export const fetchArticlesByToday = async ({
  category = 'ALL',
  page = 0,
}: PageParamsType): Promise<PageType> => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await api.get(`${ARTICLES_URL}/today`, {
      params: { pageNumber: page, filter: category },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

export const fetchArticlesByAge = async ({
  category = 'ALL',
  page = 0,
}: PageParamsType): Promise<PageType> => {
  try {
    const response = await api.get(`${ARTICLES_URL}/age`, {
      params: { pageNumber: page, filter: category },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

/**
 * IMP : 구독 페이지의 기사 조회를 위한 API
 * IMP : 1.1 pressId가 없다면, 구독한 언론사의 전체 기사를 조회함.
 * IMP : 1.2 pressId가 있다면, 해당 언론사의 전체 기사를 조회함.
 * IMP : 2.1 category가 없다면, 전체 카테고리의 기사를 조회함.
 * IMP : 2.2 category가 있다면, 해당 카테고리의 기사를 조회함.
 * @param param0
 * @returns
 */
export const fetchArticlesByPress = async ({
  category = 'ALL',
  page = 0,
  pressId,
}: PageParamsType): Promise<PageType> => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const fetchPressUrl = pressId
      ? `${ARTICLES_URL}/press/${pressId}`
      : `${ARTICLES_URL}/press`;

    const response = await api.get(fetchPressUrl, {
      params: { filter: category, pageNumber: page },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

export const fetchRandomArticles = async () => {
  try {
    const response = await api.get(`${ARTICLES_URL}/random`);
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};
