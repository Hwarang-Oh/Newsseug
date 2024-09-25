import { Cookies } from 'react-cookie';

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
