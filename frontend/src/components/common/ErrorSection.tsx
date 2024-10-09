import { ErrorProps } from 'types/common/common';
import styled from 'styled-components';

function ErrorSection({ height, text }: Readonly<ErrorProps>) {
  return (
    <Wrapper $height={height}>
      <ErrorText>{text}</ErrorText>
    </Wrapper>
  );
}

export default ErrorSection;

const Wrapper = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.relaxColor.main};
  font-size: 16px;
`;
