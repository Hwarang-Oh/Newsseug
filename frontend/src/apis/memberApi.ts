import api from 'apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
import { UserInputProps } from '@/types/userInput';
import {
  RandomNicknameResponse,
  MemberLoginResponse,
} from '@/types/api/member';

const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 */

/**
 * IMP : Random Nickname을 받아오는 API ( 외부 API 호출 )
 */
export const getRandomNickname = async (): Promise<RandomNicknameResponse> => {
  try {
    const response = await api.post<RandomNicknameResponse>(
      '/nickname/getRandomNickname.ajax',
      { lang: 'ko' },
      { baseURL: 'https://www.rivestsoft.com/nickname.html' },
    );
    console.log(response);
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
 * IMP : 회원가입을 위한 API
 * @param input
 * @returns
 */
export const registerMember = async (
  input: UserInputProps,
): Promise<MemberLoginResponse> => {
  console.log('입력하는 Data :', input);
  try {
    const response: AxiosResponse<MemberLoginResponse> = await api.put(
      MEMBER_URL,
      input,
    );
    console.log('회원가입 결과 : ', response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Not Found');
      } else throw error;
    } else throw error;
  }
};
