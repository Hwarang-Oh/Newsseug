import styled from 'styled-components';
import { ReportModalProp } from 'types/article';

function ReportModal({ submitValue, setSubmitValue }: ReportModalProp) {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitValue(e.target.name);
  };
  return (
    <OptionsContainer>
      <OptionLabel>
        <OptionInput
          type="radio"
          name="DISLIKE"
          value="마음에 들지 않습니다."
          checked={submitValue === 'DISLIKE'}
          onChange={handleOptionChange}
        />
        마음에 들지 않습니다.
      </OptionLabel>
      <OptionLabel>
        <OptionInput
          type="radio"
          name="SPAM"
          value="스팸"
          checked={submitValue === 'SPAM'}
          onChange={handleOptionChange}
        />
        스팸
      </OptionLabel>
      <OptionLabel>
        <OptionInput
          type="radio"
          name="HATE_SPEECH_OR_SYMBOLS"
          value="혐오 발언 또는 상징"
          checked={submitValue === 'HATE_SPEECH_OR_SYMBOLS'}
          onChange={handleOptionChange}
        />
        혐오 발언 또는 상징
      </OptionLabel>
      <OptionLabel>
        <OptionInput
          type="radio"
          name="MISINFORMATION"
          value="거짓 정보"
          checked={submitValue === 'MISINFORMATION'}
          onChange={handleOptionChange}
        />
        거짓 정보
      </OptionLabel>
      <OptionLabel>
        <OptionInput
          type="radio"
          name="EXPLICIT_CONTENT"
          value="선정적인 콘텐츠"
          checked={submitValue === 'EXPLICIT_CONTENT'}
          onChange={handleOptionChange}
        />
        선정적인 콘텐츠
      </OptionLabel>
    </OptionsContainer>
  );
}

export default ReportModal;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionLabel = styled.label`
  display: flex;
  padding: 14px 20px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  color: ${({ theme }) => theme.textColor};
  font-size: 12px;
  font-weight: 500;
`;

const OptionInput = styled.input`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  border: 1px solid ${({ theme }) => theme.textColor}; // 체크되지 않았을 때의 테두리 색상
  border-radius: 50%;
  outline: none; // focus 시에 나타나는 기본 스타일 제거

  &:checked {
    background-color: ${({ theme }) =>
      theme.mainColor}; // 체크 시 내부 원으로 표시될 색상
    border: 3px solid white; // 테두리가 아닌, 테두리와 원 사이의 색상
    box-shadow: 0 0 0 1.6px ${({ theme }) => theme.mainColor};
  }
`;
