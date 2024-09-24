import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MiddleModalProps } from 'types/article';
import ReportModal from 'components/articles/ReportModal';
import CreateScrapModal from 'components/articles/CreateScrapModal';

function MiddleModal({
  isOpen,
  onRequestClose,
  modalTitle,
}: Readonly<MiddleModalProps>) {
  const [submitValue, setSubmitValue] = useState<string>('');

  const handleCloseClick = () => {
    onRequestClose();
    setSubmitValue('');
  };

  const handleSubmitClick = () => {
    console.log(submitValue);
    setSubmitValue('');
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
          <ModalTitle>{modalTitle}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {modalTitle === '동영상 신고하기' ? (
            <ReportModal
              submitValue={submitValue}
              setSubmitValue={setSubmitValue}
            />
          ) : (
            <CreateScrapModal
              isOpen={isOpen}
              submitValue={submitValue}
              setSubmitValue={setSubmitValue}
            />
          )}
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

export default MiddleModal;

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
  top: 25vh;
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
