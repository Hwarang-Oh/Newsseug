import { darkenColor } from 'utils/darkenColor';
import { Helmet } from 'react-helmet-async';
import styled, { useTheme } from 'styled-components';
import { LoginModalProps } from 'types/props/login';
import { motion } from 'framer-motion';

function LoginModal({
  isVideo = false,
  onCancel,
  onLogin,
}: Readonly<LoginModalProps>) {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <meta
          name="theme-color"
          content={isVideo ? '#000' : darkenColor(theme.bgColor, -50)}
        />
      </Helmet>
      <ModalOverlay onClick={onCancel}>
        <ModalContainer
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Content>
            <Message>로그인이 필요한 서비스 입니다</Message>
            <Message>로그인을 하시겠습니까?</Message>
          </Content>
          <ButtonGroup>
            <CancelButton onClick={onCancel}>돌아가기</CancelButton>
            <ConfirmButton onClick={onLogin}>로그인</ConfirmButton>
          </ButtonGroup>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}

export default LoginModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  box-shadow:
    100px 0 100px -50px ${({ theme }) => theme.textColor + '25'},
    -100px 0 100px -50px ${({ theme }) => theme.textColor + '25'};
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  background: ${({ theme }) => theme.bgColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Content = styled.div`
  display: flex;
  color: #202020;
  gap: 5px;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;

const Message = styled.h2`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const CancelButton = styled.button`
  display: flex;
  background: ${({ theme }) => theme.bgColor};
  border: 1px solid #eee;
  justify-content: center;
  align-items: center;
  padding: 13px 0px;
  border-radius: 4px;
  flex: 1 0 0;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
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
  cursor: pointer;
`;
