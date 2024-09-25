import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';

/**
 * IMP : 아래 함수는 HTTPS에 의한 요청이 아님. Redirect를 통해 외부 URL로 이동하는 함수
 * @param provider
 */
const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization`;
export const getLogin = (provider: string): void => {
  const loginUrl = `${LOGIN_URL}/${provider}`;
  window.location.href = loginUrl;
};

/**
 * IMP : Provider Id를 기반으로 AccessToken을 가져오는 API
 */
const LOGIN_API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`;
export const getAccessToken = async (providerId: string): Promise<string> => {
  try {
    const {
      data: {
        data: { accessToken },
      },
    } = await api.get(LOGIN_API_URL, {
      params: { providerId },
    });
    return accessToken;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP: 로그아웃을 위한 API
 * TODO : 구체화를 해줘야 한다.
 * TODO : 로그아웃 후 어떤 처리를 해줄지 정의해야 한다.
 */
const LOGOUT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/logout`;
export const getLogout = async (): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await api.get(LOGOUT_URL);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
