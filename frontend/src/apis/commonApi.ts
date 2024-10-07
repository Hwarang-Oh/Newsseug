import axios, { isAxiosError } from 'axios';
import {
  getCookie,
  setCookie,
  removeCookie,
  getTokenExpiration,
} from 'utils/stateUtils';

/**
 * IMP : AccessToken 재발급을 위한 API
 */
const REFRESH_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/reissue`;
export const reissueToken = async (): Promise<string> => {
  try {
    const refreshToken = getCookie('RefreshToken');
    const providerId = getCookie('ProviderId');
    const response = await axios.get(
      `${REFRESH_URL}?providerId=${encodeURIComponent(providerId)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'refresh-token': refreshToken,
        },
      },
    );
    let accessToken = response.data.data.accessToken;
    let accessTokenTime = getTokenExpiration(response.data.data.accessToken);
    setCookie('AccessToken', accessToken, {
      maxAge: accessTokenTime,
      secure: true,
    });
    return accessToken;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else {
        removeCookie('AccessToken');
        removeCookie('RefreshToken');
        removeCookie('ProviderId');
        throw new Error('refreshToken is expired, redirecting to login.');
        // window.location.href = '/login';
      }
    } else throw error;
  }
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  let accessToken = getCookie('AccessToken');
  const refreshToken = getCookie('RefreshToken');

  if (!accessToken && refreshToken) {
    console.log('AccessToken이 없음, RefreshToken으로 토큰 재발급 시도');
    try {
      const newAccessToken = await reissueToken();
      accessToken = newAccessToken;
    } catch (error) {
      console.error(
        '토큰 재발급 실패, 로그아웃 !처리! => 비로그인 상태 요청 필요',
        error,
      );
      removeCookie('AccessToken');
      removeCookie('RefreshToken');
      removeCookie('ProviderId');
      return Promise.reject(error);
    }
  }
  if (accessToken) {
    const accessTokenTime = getTokenExpiration(accessToken);
    if (accessTokenTime && accessTokenTime > Date.now()) {
      config.headers.Authorization = accessToken;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (AuthorizationError) => {
    const originalRequest = AuthorizationError.config;
    if (
      AuthorizationError.response &&
      AuthorizationError.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = await reissueToken();
        originalRequest.headers.Authorization = accessToken;
        return api(originalRequest);
      } catch (RefreshError) {
        console.error('토큰 갱신 실패:', RefreshError);
        return Promise.reject(RefreshError);
      }
    }
    return Promise.reject(AuthorizationError);
  },
);

export default api;
