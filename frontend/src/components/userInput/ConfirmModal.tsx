import styled from 'styled-components';
import { ConfirmModalProps } from '@/types/userInput';

function ConfirmModal({
  userData,
  onConfirm,
  onCancel,
}: Readonly<ConfirmModalProps>) {
  console.log(onConfirm);
  console.log(onCancel);
  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>입력한 정보를 확인하세요</h2>
        <ModalText>닉네임: {userData.nickname}</ModalText>
        <ModalText>생년월일: {userData.birth}</ModalText>
        <ModalText>성별: {userData?.gender}</ModalText>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ConfirmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
