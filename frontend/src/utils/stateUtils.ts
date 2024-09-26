import { Cookies } from 'react-cookie';
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
