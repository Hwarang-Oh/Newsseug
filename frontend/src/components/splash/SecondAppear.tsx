import styled, { keyframes } from 'styled-components';
import NormalWord from 'components/splash/NormalWord';
import VectorWord from 'components/common/VectorWord';
import { LogoIconS } from 'components/icon/LogoIcon';
import { DelayProps } from '@/types/splash';

const VectorWordIcon = LogoIconS();

function SecondAppear({ delay }: Readonly<DelayProps>) {
  return (
    <SecondAppearStyle $delay={delay}>
      <NormalWordWrapper $delay={delay}>
        <NormalWord text="한번에" />
      </NormalWordWrapper>
      <VectorWordWrapper $delay={delay}>
        <VectorWord icon={VectorWordIcon} color={'#FFFFFF'} />
      </VectorWordWrapper>
    </SecondAppearStyle>
  );
}

export default SecondAppear;

// NormalWord 애니메이션
const normalWordAnimation = keyframes`
  0% {
    transform: translateX(60%) skewX(30deg);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

// VectorWord 애니메이션
const vectorWordAnimation = keyframes`
  0% {
    transform: translateX(60%) skewX(30deg);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const vectorWordShakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(6px); }
  50% { transform: translateX(-6px); }
  75% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

const NormalWordWrapper = styled.div<{ $delay: string }>`
  opacity: 0;
  animation: ${normalWordAnimation} 0.7s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay};
`;

const VectorWordWrapper = styled.div<{ $delay: string }>`
  opacity: 0;
  animation:
    ${vectorWordAnimation} 0.2s ease-out forwards,
    ${vectorWordShakeAnimation} 0.5s ease-out 0.7s;
  animation-delay: ${({ $delay }) => `calc(${$delay} + 0.5s)`};
`;

const SecondAppearStyle = styled.div<{ $delay: string }>`
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 38%;
  right: 15%;
  gap: 15px;
`;
