import api from '@/apis/commonApi';
import { AxiosResponse, isAxiosError } from 'axios';
import { UserInputProps } from '@/types/userInput';
import { MemberLoginResponse } from '@/types/api/member';

const MEMBER_URL = '/api/v1/members';

/**
 * IMP : 비동기 함수에서 Promise 기반으로 asnyc/await과 try/catch를 통해 호출자가 CallBack 정의 없이 직접 처리
 * Type : Promise<AxiosResponse> => AxiosResponse의 Case에 대한 Promise를 반환해야 함.
 */

/**
 * IMP : 회원가입을 위한 API
 * @param input
 * @returns
 */
export const registerMember = async (
  input: UserInputProps,
): Promise<MemberLoginResponse> => {
  try {
    const response: AxiosResponse<MemberLoginResponse> = await api.put(
      MEMBER_URL,
      input,
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
