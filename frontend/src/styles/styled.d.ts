import 'styled-components';

interface RelaxColor {
  main: string;
  superlight: string;
  light: string;
  littlelight: string;
  dark: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    mainColor: string;
    relaxColor: RelaxColor;
    descriptionBgColor: string;
    descriptionColor: string;
  }
}
