import styled, { keyframes } from 'styled-components';

function Spinner({ height }: { height: string }) {
  return (
    <Wrapper $height={height}>
      <LoadingIndicator></LoadingIndicator>
    </Wrapper>
  );
}

export default Spinner;

const Wrapper = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  display: inline-block;
  /* position: absolute;
  left: 50%;
  top: 50%;
  right: auto;
  bottom: auto; */
  width: 30px;
  height: 30px;
  border: 5px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: ${SpinnerAnimation} 0.6s linear infinite;
  margin: 0 auto;
`;
