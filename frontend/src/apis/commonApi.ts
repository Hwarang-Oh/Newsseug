import axios, { AxiosResponse, isAxiosError } from 'axios';

/**
 * IMP : Axios를 사용한 API 호출을 위한 기본 설정.
 * IMP : baseURL은 .env.local에 정의되어 있습니다. => 그 뒤의 URL을 상황에 맞게 정의하면 됩니다.
 * IMP : Content-Type은 JSON으로 설정되어 있습니다. => 다른 형식을 사용하고 싶다면, 직접 사용하는 쪽에서 수정해야 합니다.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * IMP : 인증 토큰이 필요한 경우 새로운 인스턴스를 생성하는 함수.
 * @param token
 * @returns
 */
export const apiWithToken = (token: string) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;

/**
 * ! 아래 함수는 API 호출 예시에 불과함.
 * IMP : API 호출 예시 함수 - 회원 정보 가져오기
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * Type : Promise<T> => AxiosResponse<T>의 Case에 대한 Promise를 반환해야 함.
 */
type UserInfo = {};
const getUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    const response: AxiosResponse<UserInfo> = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};

/**
 * IMP : 아래 함수는 개별 API 호출에 대한 Content-Type을 변경하는 예시
 * @param url
 * @param data
 * @returns
 */
// Type : Content-Type 변경 예시
const postData = async (url: string, data: any) => {
  const response = await api.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // 기본 설정을 덮어씌움
    },
  });
  return response.data;
};

// Type: Authorization 헤더 추가 예시
const getDataWithAuth = async (url: string, token: string) => {
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, // 인증 토큰 추가
    },
  });
  return response.data;
};
