import styled, { keyframes } from 'styled-components';
import NormalWord from 'components/splash/NormalWord';
import VectorWord from 'components/common/VectorWord';
import { LogoIconN } from 'components/icon/LogoIcon';

const VectorWordIcon = LogoIconN();
function FirstAppear() {
  return (
    <FirstAppearMethod>
      <VectorWord icon={VectorWordIcon} color={'#FFFFFF'} />
      <NormalWord text="스를" />
    </FirstAppearMethod>
  );
}

export default FirstAppear;

const appearAnimation = keyframes`
  0% {
    transform: translateX(-60%) skewX(-30deg);
  }
  100% {
  opacity: 1;
    transform: translateX(0) skewX(0deg);
  }
`;

const FirstAppearMethod = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 20%;
  left: 15%;
  gap: 15px;
  opacity: 0;
  animation: ${appearAnimation} 0.7s ease-out forwards;
`;
