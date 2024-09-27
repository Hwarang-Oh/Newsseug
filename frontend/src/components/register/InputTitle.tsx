import styled from 'styled-components';
import { InputTitleProps } from 'types/props/register';

function InputTitle({ title }: Readonly<InputTitleProps>) {
  return (
    <InputTitleContainerStyle>
      <InputTitleStyle>{title}</InputTitleStyle>
    </InputTitleContainerStyle>
  );
}
export default InputTitle;

const InputTitleContainerStyle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 8px 0px;
`;

const InputTitleStyle = styled.p`
  color: #202020;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;
