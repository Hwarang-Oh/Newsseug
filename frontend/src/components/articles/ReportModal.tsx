import { fetchReportArticle } from 'apis/articleVideoApi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { ModalProps } from 'types/props/articleVideo';

function ReportModal({
  articleId,
  isOpen,
  onRequestClose,
}: Readonly<ModalProps>) {
  const [reportValue, setReportValue] = useState<string>('');
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportValue(e.target.name);
  };

  const handleCloseClick = () => {
    onRequestClose();
  };

  const handleSubmitClick = async () => {
    try {
      await fetchReportArticle(articleId, reportValue);

      onRequestClose();
    } catch (err) {
      console.error(`${articleId}번 기사 신고(${reportValue}) 실패`, err);
    }
  };
  return (
    <ModalOverlay onClick={handleCloseClick}>
      <ModalContent
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>새 폴더 생성</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <OptionLabel>
            <OptionInput
              type="radio"
              name="DISLIKE"
              value="마음에 들지 않습니다."
              checked={reportValue === 'DISLIKE'}
              onChange={handleOptionChange}
            />
            마음에 들지 않습니다.
          </OptionLabel>
          <OptionLabel>
            <OptionInput
              type="radio"
              name="SPAM"
              value="스팸"
              checked={reportValue === 'SPAM'}
              onChange={handleOptionChange}
            />
            스팸
          </OptionLabel>
          <OptionLabel>
            <OptionInput
              type="radio"
              name="HATE_SPEECH_OR_SYMBOLS"
              value="혐오 발언 또는 상징"
              checked={reportValue === 'HATE_SPEECH_OR_SYMBOLS'}
              onChange={handleOptionChange}
            />
            혐오 발언 또는 상징
          </OptionLabel>
          <OptionLabel>
            <OptionInput
              type="radio"
              name="MISINFORMATION"
              value="거짓 정보"
              checked={reportValue === 'MISINFORMATION'}
              onChange={handleOptionChange}
            />
            거짓 정보
          </OptionLabel>
          <OptionLabel>
            <OptionInput
              type="radio"
              name="EXPLICIT_CONTENT"
              value="선정적인 콘텐츠"
              checked={reportValue === 'EXPLICIT_CONTENT'}
              onChange={handleOptionChange}
            />
            선정적인 콘텐츠
          </OptionLabel>
        </ModalBody>
        <ModalFooter>
          <Btn onClick={handleCloseClick} $isSubmit={false}>
            취소
          </Btn>
          <Btn onClick={handleSubmitClick} $isSubmit={true}>
            완료
          </Btn>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ReportModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1001;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 20vh;
`;

const ModalHeader = styled.div`
  display: flex;
  padding: 18px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ModalTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.25px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 14px 20px;
  flex-direction: column;
  gap: 10px;
`;

const ModalFooter = styled.div`
  display: flex;
  padding: 18px 30px;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;
const Btn = styled.button<{ $isSubmit: boolean }>`
  cursor: pointer;
  color: ${({ theme, $isSubmit }) =>
    $isSubmit ? theme.mainColor : theme.textColor};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
  background: none;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  outline: none;
  &:active {
    background-color: ${({ theme }) => theme.textColor + '3b'};
    transition: none;
  }

  &:not(:active) {
    transition: background-color 0.5s;
  }
`;

const OptionLabel = styled.label`
  cursor: pointer;
  display: flex;
  padding: 14px 0px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  font-weight: 500;
`;

const OptionInput = styled.input`
  margin-right: 5px;
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
    transition: 0.2s;
  }
`;
