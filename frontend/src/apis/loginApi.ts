import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';

/**
 * IMP : 아래 함수는 API가 아님. Redirect를 통해 외부 URL로 이동하는 함수
 * TODO : Local Front 개발 환경이 갖춰지기 전 까지는 local remote 주석을 변경해야 한다.
 * @param provider
 */
// Type : local
const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization`;
// Type : remote
// const LOGIN_URL = `/oauth2/authorization`;
export const getLogin = (provider: string): void => {
  const loginUrl = `${LOGIN_URL}/${provider}`;
  window.location.href = loginUrl;
};

/**
 * IMP : Provider Id를 기반으로 AccessToken을 가져오는 API
 * IMP : Authorization Header가 필요하지 않은 API ( 비로그인 기능 )
 */
// Type : local
const LOGIN_API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`;
// Type : remote
// const LOGIN_API_URL = `/api/v1/auth/login`;
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
 * TODO : 로그아웃 후, 어떤 처리를 해줄 지 정의해야 한다. ( State 관리, Cookie 관리, Page 이동 등 )
 * IMP : Authorization Header가 필요한 API ( 로그인 기능 )
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
