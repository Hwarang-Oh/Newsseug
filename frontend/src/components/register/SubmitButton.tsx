import styled from 'styled-components';
import { SubmitButtonProps } from 'types/register';

function SubmitButton({ disabled, onClick }: Readonly<SubmitButtonProps>) {
  return (
    <ButtonBox>
      <SubmitButtonStyle disabled={disabled} onClick={onClick}>
        <SubmitButtonTextStyle>입력 완료</SubmitButtonTextStyle>
      </SubmitButtonStyle>
    </ButtonBox>
  );
}
export default SubmitButton;

const ButtonBox = styled.div`
  margin: 0px 24px;
`;

const SubmitButtonStyle = styled.div<{ disabled: boolean }>`
  display: flex;
  width: 100%;
  padding: 13px 0px;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: ${({ disabled }) => (disabled ? '#D4D4D4' : '#58d7a2')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease;
  &:hover {
    background: ${({ disabled }) => (disabled ? '#D4D4D4' : '#45c690')};
  }
`;

const SubmitButtonTextStyle = styled.p`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;
