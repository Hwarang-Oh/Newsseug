import { PressInfoProps } from 'types/props/press';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatNumber } from 'utils/formatNumber';
import { subscribePress, unsubscribePress } from 'apis/subscribe';
import { getCookie, setCookie } from 'utils/stateUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from 'components/login/LoginModal';

function PressProfile({
  id,
  name,
  imageUrl,
  subscribeCount,
  isSubscribed,
}: Readonly<PressInfoProps>) {
  const [isSub, setIsSub] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsSub(isSubscribed);
  }, []);

  const isAuthenticated = () => {
    const token = getCookie('AccessToken');
    return !!token; // 토큰이 있으면 true, 없으면 false
  };

  const handleLogin = () => {
    setIsLoginModalOpen(false);
    setCookie('redirect', location.pathname, { maxAge: 60 });
    navigate('/login');
  };

  const handleButtonClickWithoutLogin = () => {
    setIsLoginModalOpen((prev) => !prev);
  };

  const handleSubscribe = async () => {
    try {
      if (!isAuthenticated()) {
        handleButtonClickWithoutLogin();
        return;
      }

      if (isSub) {
        await unsubscribePress(id);
        setIsSub(false);
      } else {
        await subscribePress(id);
        setIsSub(true);
      }
    } catch (err) {
      console.error('구독/구독취소 실패', err);
    }
  };
  return (
    <Wrapper>
      {isLoginModalOpen && (
        <LoginModal
          onCancel={handleButtonClickWithoutLogin}
          onLogin={handleLogin}
        />
      )}
      <Logo src={imageUrl} />
      <TextArea>
        <InfoArea>
          <PressName>{name}</PressName>
          <PressSubCnt>구독자 {formatNumber(subscribeCount)}명</PressSubCnt>
        </InfoArea>
        <SubscribeBtn onClick={handleSubscribe} $isSubscribed={isSub}>
          {isSub ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 9 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M7.36612 0.96967C7.65901 0.676777 8.13388 0.676777 8.42678 0.96967C8.71608 1.25897 8.71963 1.72582 8.43742 2.01947L4.44522 7.00973C4.43946 7.01693 4.4333 7.02381 4.42678 7.03033C4.13388 7.32322 3.65901 7.32322 3.36612 7.03033L0.71967 4.38388C0.426777 4.09099 0.426777 3.61612 0.71967 3.32322C1.01256 3.03033 1.48744 3.03033 1.78033 3.32322L3.87385 5.41674L7.34622 0.992105C7.3524 0.984235 7.35904 0.976743 7.36612 0.96967Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 9 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 0C4.77614 0 5 0.223858 5 0.5V3.5H8C8.27614 3.5 8.5 3.72386 8.5 4C8.5 4.27614 8.27614 4.5 8 4.5H5V7.5C5 7.77614 4.77614 8 4.5 8C4.22386 8 4 7.77614 4 7.5V4.5H1C0.723858 4.5 0.5 4.27614 0.5 4C0.5 3.72386 0.723858 3.5 1 3.5H4V0.5C4 0.223858 4.22386 0 4.5 0Z"
                fill="white"
              />
            </svg>
          )}
          {isSub ? ' 구독중' : ' 구독하기'}
        </SubscribeBtn>
      </TextArea>
    </Wrapper>
  );
}

export default PressProfile;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`;

const Logo = styled.img`
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.relaxColor.superlight};
  background: ${({ theme }) => theme.bgColor};
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
const SubscribeBtn = styled.button<{ $isSubscribed: boolean }>`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  /* border: 1px solid ${({ theme }) => theme.mainColor}; */
  border: none;
  color: ${({ theme, $isSubscribed }) =>
    $isSubscribed ? theme.mainColor : theme.bgColor};
  background-color: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? theme.relaxColor.main : theme.mainColor};
  color: #fff;

  transition: 0.15s;
  cursor: pointer;
`;

const PressName = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.35px;
`;

const PressSubCnt = styled.span`
  color: ${({ theme }) => theme.relaxColor.main};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;
