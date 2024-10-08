import reset from 'styled-reset';
import PretendardBlack from '../fonts/Pretendard-Black.ttf';
import PretendardBold from '../fonts/Pretendard-Bold.ttf';
import PretendardExtraBold from '../fonts/Pretendard-ExtraBold.ttf';
import PretendardExtraLight from '../fonts/Pretendard-ExtraLight.ttf';
import PretendardLight from '../fonts/Pretendard-Light.ttf';
import PretendardMedium from '../fonts/Pretendard-Medium.ttf';
import PretendardRegular from '../fonts/Pretendard-Regular.ttf';
import PretendardSemiBold from '../fonts/Pretendard-SemiBold.ttf';
import PretendardThin from '../fonts/Pretendard-Thin.ttf';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
  font-family: "Pretendard-Black";
  src: url(${PretendardBlack});
}
@font-face {
  font-family: "Pretendard-Bold";
  src: url(${PretendardBold});
}
@font-face {
  font-family: "Pretendard-ExtraBold";
  src: url(${PretendardExtraBold});
}
@font-face {
  font-family: "Pretendard-ExtraLight";
  src: url(${PretendardExtraLight});
}
@font-face {
  font-family: "Pretendard-Light";
  src: url(${PretendardLight});
}
@font-face {
  font-family: "Pretendard-Medium";
  src: url(${PretendardMedium});
}
@font-face {
  font-family: "Pretendard-Regular";
  src: url(${PretendardRegular});
}
@font-face {
  font-family: "Pretendard-SemiBold";
  src: url(${PretendardSemiBold});
}
@font-face {
  font-family: "Pretendard-Thin";
  src: url(${PretendardThin});
}
                      
* {
    font-family: "Pretendard-Regular" !important;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${({ theme }) => theme.bgColor}
  }

`;

export default GlobalStyle;
