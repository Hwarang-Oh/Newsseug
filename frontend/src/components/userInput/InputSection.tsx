import styled from 'styled-components';
import InputTitle from 'components/userInput/InputTitle';
import InputBox from 'components/userInput/InputBox';
import { InputSectionProps } from '@/types/userInput';

function InputSection({
  title,
  input,
  backGroundColor,
  canEdit = true,
  onChange,
  error,
}: Readonly<InputSectionProps>) {
  return (
    <InputSectionContainerStyle>
      <InputTitle title={title} />
      <InputBox
        input={input}
        backGroundColor={backGroundColor}
        canEdit={canEdit}
        type="tel"
        onChange={onChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputSectionContainerStyle>
  );
}

export default InputSection;

const InputSectionContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 24px;
  gap: 8px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;
