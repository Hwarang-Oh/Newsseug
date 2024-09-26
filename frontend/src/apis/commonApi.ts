import axios from 'axios';
import { store } from '../redux/index';

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

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.member.AccessToken;
  if (token !== '') {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;
