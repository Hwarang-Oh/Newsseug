import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
const ARTICLES_URL = `/api/v1/articles`;

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 * TODO : 나중에 ArticleResponse의 Type을 정의하고 다른 파일로 빼줘야 함.
 */
interface ArticleResponse {}

/**
 * IMP : Home 화면에서 사용하는 Articles를 Fetch하는 API
 * * pageTitle : 오늘의 뉴스 Articles[] , 20대 관심 기사 Articles[], 전체 기사 Articles[]
 * * => 각 특성에 맞는 Articles[] Array가 필요함.
 */
export const fetchArticles = async () => {
  try {
    const response = await api.get(ARTICLES_URL);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * IMP : 각 Article을 Fetch하는 API
 * *  ArticleId를 통해 각 Article 1개를 Fetch한다.
 * @param articleId
 */
export const fetchEachArticle = async (articleId: number) => {
  try {
    const response = await api.get(`${ARTICLES_URL}/${articleId}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * IMP : 각 Category에 해당하는 Articles[]를 Fetch하는 API => Query Parameter로 Category를 받아서 Fetch
 * @param category
 */
export const fetchArticlesByCategory = async (category: string) => {
  try {
    const response = await api.get(
      `${ARTICLES_URL}?category=${encodeURIComponent(category)}`,
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
