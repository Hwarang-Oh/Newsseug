import {
  EsSearchResultInfo,
  SearchApiParams,
  SearchResultInfo,
} from 'types/api/search';
import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
const SEARCH_URL = '/api/v1/search';

/**
 * IMP : 회원의 언론사 구독 목록 조회를 위한 API
 */
export const getSearchResult = async ({
  keywordText,
  pageNumber,
  category,
}: SearchApiParams): Promise<SearchResultInfo> => {
  try {
    const response = await api.get(`${SEARCH_URL}`, {
      params: {
        keyword: keywordText,
        pageNumber,
        filter: category,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

export const getEsSearchResult = async (
  keyword: string,
  pageNumber: number,
): Promise<EsSearchResultInfo> => {
  try {
    const response = await api.get(`${SEARCH_URL}/es`, {
      params: {
        keyword,
        pageNumber,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
