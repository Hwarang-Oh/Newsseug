import styled from 'styled-components';
import { InputBoxProps } from 'types/props/register';

function InputBox({
  input,
  backGroundColor,
  canEdit,
  type,
  onChange,
}: Readonly<InputBoxProps>) {
  return (
    <InputBoxContainerStyle $backGroundColor={backGroundColor}>
      <InputBoxTextStyle
        value={input}
        placeholder={!input ? '예) YYYY.MM.DD' : ''}
        readOnly={!canEdit}
        type={type}
        onChange={onChange}
      />
    </InputBoxContainerStyle>
  );
}
export default InputBox;

const InputBoxContainerStyle = styled.div<{ $backGroundColor?: string }>`
  display: flex;
  padding: 11px 12px;
  border-radius: 4px;
  background-color: ${({ $backGroundColor }) => $backGroundColor ?? 'white'};
  ${({ $backGroundColor }) => !$backGroundColor && 'border: 1px solid #ccc;'}
`;

const InputBoxTextStyle = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 4px;
  height: 25px;
  background-color: transparent;
  box-sizing: border-box;
`;
