import { CreateScrapModalProps } from 'types/article';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function CreateScrapModal({
  isOpen,
  submitValue,
  setSubmitValue,
}: CreateScrapModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitValue(e.currentTarget.value);
  };
  return (
    <Container>
      <TextInput
        ref={inputRef}
        placeholder="폴더 이름을 입력해주세요."
        maxLength={10}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)} // 포커스 시 상태 변경
        onBlur={() => setIsFocused(false)} // 포커스 해제 시 상태 변경
      />
      <TextCnt $disabled={!isFocused}>{submitValue.length}/10</TextCnt>
    </Container>
  );
}

export default CreateScrapModal;

const Container = styled.div`
  display: flex;
  padding: 14px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const TextInput = styled.input`
  color: ${({ theme }) => theme.relaxColor.littlelight};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
  width: 100%;
  box-sizing: border-box;
  caret-color: ${({ theme }) => theme.relaxColor.dark};
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.relaxColor.littlelight};
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.mainColor};
    outline: none;
    transition: 0.1s;
  }
`;

const TextCnt = styled.span<{ $disabled: boolean }>`
  width: 100%;
  font-size: 14px;
  text-align: end;
  color: ${({ theme, $disabled }) =>
    $disabled ? 'transparent' : theme.relaxColor.dark};
  padding-right: 5px;
  box-sizing: border-box;
`;
