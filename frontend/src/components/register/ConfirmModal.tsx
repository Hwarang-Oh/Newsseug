import styled from 'styled-components';
import { ConfirmModalProps } from 'types/register';

/**
 * IMP : Confirm Modal Component
 * IMP : ConfirmButton에 onClick Event가 없어도, 부모 Component의 Form 안에 있음
 * IMP : => 부모 Component의 Form에서 onSubmit Event를 통해 ConfirmButton의 onClick Event를 대체
 * @param param0
 * @returns
 */
function ConfirmModal({ userData, onCancel }: Readonly<ConfirmModalProps>) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>입력한 내용을 확인해주세요</Title>

        <InfoTable>
          <InfoRow>
            <Label>닉네임:</Label> <Value>{userData.nickname} ✅</Value>
          </InfoRow>
          <InfoRow>
            <Label>성별:</Label>{' '}
            <Value> {userData.gender === 'Male' ? '남자' : '여자'} ✅</Value>
          </InfoRow>
          <InfoRow>
            <Label>생년월일:</Label> <Value>{userData.birth} ✅</Value>
          </InfoRow>
        </InfoTable>

        <Message>
          정보가 정확한가요?
          <br />
          문제가 없으면 '확인'을 눌러주세요!
        </Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton>확인</ConfirmButton>
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
  text-align: center;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const InfoTable = styled.div`
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  color: #555;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin: 0 auto;
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
  background-color: #58d7a2;
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
