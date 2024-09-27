import { ArticleVideo } from 'types/api/articleVideo';
import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';

const ARTICLES_URL = `/api/v1/articles`;

/**
 * IMP : 각 Article을 Fetch하는 API
 * *  ArticleId를 통해 각 Article 1개를 Fetch한다.
 * @param articleId
 */
export const fetchEachArticle = async (
  articleId: number,
): Promise<ArticleVideo> => {
  try {
    const response = await api.get(`${ARTICLES_URL}/${articleId}`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
