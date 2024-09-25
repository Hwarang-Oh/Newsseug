import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
import { Article } from '@/types/api/article';
import article from 'db/article.json';

const ARTICLES_URL = `/api/v1/articles`;

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * IMP : Article을 상황에 맞게 Fetch하는 API를 구현하고 있음. Mock Data로 dummy.json을 사용하고 있음.
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 */

/**
 * IMP : Home 화면에서 사용하는 모든 Articles를 Fetch하는 API
 */
export const fetchAllArticles = async (): Promise<Article[]> => {
  try {
    const response: AxiosResponse<Article[]> = await api.get(
      `${ARTICLES_URL}/all`,
    );
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      // IMP : API 없거나, 404 Not Found Error가 발생할 경우 Mock Data를 사용하고 있음.
      if (error.response?.status === 401) {
        console.warn('API가 없으므로 Mock 데이터를 반환합니다.');
        return article.articles;
        // throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : Home 화면에서 사용하는 '오늘의 뉴스' Articles를 Fetch하는 API
 */
export const fetchArticlesByToday = async (): Promise<Article[]> => {
  try {
    const response: AxiosResponse<Article[]> = await api.get(
      `${ARTICLES_URL}/today`,
    );
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn('API가 없으므로 Mock 데이터를 반환합니다.');
        return (
          article.articleByCategory.find(
            (eachSection) => eachSection.category === '오늘의 뉴스',
          )?.articleList || []
        );
        // throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : Home 화면에서 사용하는 '연령대별 뉴스' Articles를 Fetch하는 API
 */
export const fetchArticlesByAge = async (age: number): Promise<Article[]> => {
  try {
    const response: AxiosResponse<Article[]> = await api.get(
      `${ARTICLES_URL}?age=${encodeURIComponent(age)}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn('API가 없으므로 Mock 데이터를 반환합니다.');
        return [];
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 각 Category에 해당하는 Articles[]를 Fetch하는 API => Query Parameter로 Category를 받아서 Fetch
 * @param category
 */
export const fetchArticlesByCategory = async (
  category: string,
): Promise<Article[]> => {
  try {
    const response: AxiosResponse<Article[]> = await api.get(
      `${ARTICLES_URL}?category=${encodeURIComponent(category)}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn('API가 없으므로 Mock 데이터를 반환합니다.');
        return (
          article.articleByCategory.find(
            (eachSection) => eachSection.category === category,
          )?.articleList || []
        );
        // throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 각 Article을 Fetch하는 API
 * *  ArticleId를 통해 각 Article 1개를 Fetch한다.
 * @param articleId
 */
export const fetchEachArticle = async (articleId: number): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await api.get(
      `${ARTICLES_URL}/${articleId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
