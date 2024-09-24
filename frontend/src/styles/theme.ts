import { DefaultTheme } from 'styled-components/dist/types';

export const darkTheme: DefaultTheme = {
  bgColor: '#202020',
  textColor: 'white',
  mainColor: '#58D7A2',
  relaxColor: {
    // 회색 종류
    main: '#807E7E',
    superlight: '#F4F4F4', // 매우매우 연한 회색
    light: '#D9D9D9', // 연한 회색
    littlelight: '#ABABAB',
    dark: '#5E5F60', // 진한 회색
  },
  descriptionBgColor: '#3a3a3a',
  descriptionColor: '#EEEEEE',
};

export const lightTheme: DefaultTheme = {
  bgColor: 'white',
  textColor: '#202020',
  mainColor: '#58D7A2',
  relaxColor: {
    // 회색 종류
    main: '#807E7E',
    superlight: '#F4F4F4', // 매우매우 연한 회색
    light: '#D9D9D9', // 연한 회색
    littlelight: '#ABABAB',
    dark: '#5E5F60', // 진한 회색
  },
  descriptionBgColor: '#fafafa',
  descriptionColor: '#EEEEEE',
};
