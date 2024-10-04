import api from 'apis/commonApi';
import { isAxiosError } from 'axios';
import { getCookie, removeCookie, setCookie } from 'utils/stateUtils';

/**
 * IMP : 아래 함수는 API가 아님. Redirect를 통해 외부 URL로 이동하는 함수
 * TODO : Local Front 개발 환경이 갖춰지기 전 까지는 local remote 주석을 변경해야 한다.
 * @param provider
 */
// Type : local
// const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization`;
// Type : remote
// LIIIIIIIIIIIIIIIIIIINEEEEEEEEEEEEEEEEEEEE CHANGED
const LOGIN_URL = `/oauth2/authorization`;
export const getLogin = (provider: string): void => {
  const loginUrl = `${LOGIN_URL}/${provider}`;
  console.log(loginUrl);
  window.location.href = loginUrl;
};

/**
 * IMP : Provider Id를 기반으로 AccessToken을 가져오는 API
 * IMP : Authorization Header가 필요하지 않은 API ( 비로그인 기능 )
 */
// Type : local
// const LOGIN_API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`;
// Type : remote
// LIIIIIIIIIIIIIIIIIIINEEEEEEEEEEEEEEEEEEEE CHANGED
const LOGIN_API_URL = `/api/v1/auth/login`;
export const getAccessToken = async (providerId: string): Promise<string> => {
  try {
    const {
      data: {
        data: { accessToken },
      },
    } = await api.get(
      `${LOGIN_API_URL}?providerId=${encodeURIComponent(providerId)}`,
    );
    return accessToken;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

/**
 * IMP : Provider ID를 기반으로 AccessToken을 재발급 받는 API
 * TODO : AccessToken이 재발급되지 않으면, ProviderId를 재발급 받기 위한 처리가 필요함.
 * TODO : AccessToken maxAge는 900으로 설정해야 함.
 */
export async function scheduleTokenRefresh() {
  let providerId = getCookie('ProviderId');
  try {
    const accessToken = await getAccessToken(providerId);
    setCookie('AccessToken', accessToken, { maxAge: 900, secure: true });
  } catch (error: unknown) {
    console.error('AccessToken 재발급 실패:', error);
    removeCookie('AccessToken');
    removeCookie('ProviderId');
    window.location.href = '/login';
  }
}

/**
 * IMP : 아래 함수는 API가 아님. Cookie를 제거하여 Logout을 수행하고 Redirect를 통해 Login Page로 이동함
 */
export const getLogout = () => {
  removeCookie('AccessToken');
  removeCookie('ProviderId');
  window.location.href = '/login';
};
