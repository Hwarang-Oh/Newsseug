import api from './commonApi';
import axios, { AxiosResponse, isAxiosError } from 'axios';

/**
 * IMP : 아래 함수는 HTTPS에 의한 요청이 아님. Redirect를 통해 외부 URL로 이동하는 함수
 * TODO : window.location.href를 통해 외부 URL로 이동하는 함수 ( Modal로 띄울 수 있도록 해야 한다 )
 * @param provider
 */
const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization`;
export const redirectToLogin = (provider: string): void => {
  const loginUrl = `${LOGIN_URL}/${provider}`;
  window.location.href = loginUrl;
};

export const login = async (provider: string) => {
  const response = await axios.get(LOGIN_URL);
  console.log(response.data);
};

/**
 * IMP: 로그아웃을 위한 API
 * TODO : 구체화를 해줘야 한다.
 * TODO : 로그아웃 후 어떤 처리를 해줄지 정의해야 한다.
 */
const LOGOUT_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/logout`;
export const logout = async (): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await api.get(LOGOUT_URL);
    console.log(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
