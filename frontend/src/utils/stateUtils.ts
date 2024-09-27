import { Cookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'types/api/member';

/**
 * IMP : Cookies
 */
const cookies = new Cookies();
export const setCookie = (name: string, value: string, option?: any) => {
  cookies.set(name, value, {
    path: '/',
    ...option,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: any) => {
  cookies.remove(name, {
    path: '/',
    ...option,
  });
};

export function getTokenExpiration(token: string): number | null {
  try {
    if (!token) return null;
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000;
  } catch (error: unknown) {
    console.error('Error in decoding token', error);
    return null;
  }
}

/**
 * IMP : Session Storage
 */
export const saveStateToSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (error: unknown) {
    console.error(error);
  }
};

export const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};
