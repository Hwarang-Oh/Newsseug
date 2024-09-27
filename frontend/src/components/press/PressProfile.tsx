import { PressInfoProps } from 'types/props/press';
import { useState } from 'react';
import styled from 'styled-components';
import { formatNumber } from 'utils/formatNumber';

function PressProfile({
  name,
  imageUrl,
  subscribeCount,
}: Readonly<PressInfoProps>) {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = () => {
    setIsSubscribed((prev) => !prev);
  };
  return (
    <Wrapper>
      <Logo src={imageUrl} />
      <TextArea>
        <InfoArea>
          <PressName>{name}</PressName>
          <PressSubCnt>구독자 {formatNumber(subscribeCount)}명</PressSubCnt>
        </InfoArea>
        <SubscribeBtn onClick={handleSubscribe} isSubscribed={isSubscribed}>
          {isSubscribed ? '구독 중' : '구독하기'}
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
const SubscribeBtn = styled.button<{ isSubscribed: boolean }>`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.mainColor};
  color: ${({ theme, isSubscribed }) =>
    isSubscribed ? theme.mainColor : theme.bgColor};
  background: ${({ theme, isSubscribed }) =>
    isSubscribed ? theme.bgColor : theme.mainColor};
  transition: 0.15s;
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
