import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { ArticleVideo } from 'types/api/articleVideo';

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
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 기사 좋아요
 * @param articleId
 */
export const fetchLikeArticle = async (articleId: number) => {
  try {
    await api.post(`/api/v1/likes/articles/${articleId}`);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('좋아요 실패');
      } else if (error.response?.status === 404) {
        throw new Error('기사 또는 사용자 조회 실패');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 기사 좋아요 취소
 * @param articleId
 */
export const fetchDislikeArticle = async (articleId: number) => {
  try {
    await api.delete(`/api/v1/likes/articles/${articleId}`);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('좋아요 취소 실패');
      } else if (error.response?.status === 404) {
        throw new Error('기사 또는 사용자 조회 실패');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 기사 싫어요
 * @param articleId
 */
export const fetchHateArticle = async (articleId: number) => {
  try {
    await api.post(`/api/v1/hates/articles/${articleId}`);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('좋아요 실패');
      } else if (error.response?.status === 404) {
        throw new Error('기사 또는 사용자 조회 실패');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 기사 싫어요 취소
 * @param articleId
 */
export const fetchDishateArticle = async (articleId: number) => {
  try {
    await api.delete(`/api/v1/hates/articles/${articleId}`);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('좋아요 취소 실패');
      } else if (error.response?.status === 404) {
        throw new Error('기사 또는 사용자 조회 실패');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 기사 신고
 * @param articleId
 * @param reportType
 */
export const fetchReportArticle = async (
  articleId: number,
  reportType: string,
) => {
  try {
    await api.post(`/api/v1/reports/articles/${articleId}`, null, {
      params: { reportType },
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('신고 실패');
      } else throw error;
    } else throw error;
  }
};
