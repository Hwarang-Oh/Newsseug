import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
const LOGIN_URL = `/oauth2/authorization`;

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 * TODO : 나중에 LoginResponse의 Type을 다른 파일로 빼줘야 함.
 */
interface LoginResponse {
  redirectUrl: string;
}

export const getLogin = async (
  provider: 'google' | 'kakao',
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.get(
      `${LOGIN_URL}/${provider}`,
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
