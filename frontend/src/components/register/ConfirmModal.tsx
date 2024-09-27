import styled from 'styled-components';
import { ConfirmModalProps } from 'types/props/register';

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
        <Title>입력하신 정보를 확인해주세요</Title>

        <InfoTable>
          <InfoRow>
            <Label>닉네임</Label>
            <Value>{userData.nickname}</Value>
          </InfoRow>
          <InfoRow>
            <Label>성별</Label>
            <Value>{userData.gender === 'MALE' ? '남성' : '여성'}</Value>
          </InfoRow>
          <InfoRow>
            <Label>생년월일</Label>
            <Value>{userData.birth}</Value>
          </InfoRow>
        </InfoTable>

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
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 80%;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-top: 8px;
  margin-bottom: 20px;
  color: #202020;
  font-weight: bold;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;

const InfoTable = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: flext-start;
  padding: 20px 0px;
  margin-bottom: 20px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  border-left: none;
  border-right: none;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
  gap: 16px;
`;

const Label = styled.div`
  width: 80px;
  color: #606060;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.35px;
`;

const Value = styled.div`
  color: #202020;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.35px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const CancelButton = styled.button`
  display: flex;
  background: #fff;
  border: 1px solid #eee;
  justify-content: center;
  align-items: center;
  padding: 13px 0px;
  border-radius: 4px;
  flex: 1 0 0;
`;

const ConfirmButton = styled.button`
  display: flex;
  border: none;
  color: #ffffff;
  background-color: #58d7a2;
  padding: 13px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex: 1 0 0;
`;
