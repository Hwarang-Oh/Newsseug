import { ModalBasicProps } from 'types/props/articleVideo';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { createFolder } from 'apis/folderApi';
import { useDispatch } from 'react-redux';
import { setMemberFolder } from '../../redux/memberFolderSlice';

function CreateScrapModal({
  isOpen,
  onRequestClose,
}: Readonly<ModalBasicProps>) {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [folderName, setFolderName] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, folderName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.currentTarget.value);
  };

  const handleCloseClick = () => {
    onRequestClose();
  };

  const handleSubmitClick = async () => {
    try {
      const data = await createFolder(folderName);

      dispatch(setMemberFolder(data));
      onRequestClose();
    } catch (error) {
      console.error('폴더 생성 실패', error);
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
          <TextInput
            ref={inputRef}
            placeholder="폴더 이름을 입력해주세요."
            maxLength={10}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TextCnt $disabled={!isFocused}>{folderName.length}/10</TextCnt>
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

export default CreateScrapModal;

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
