import { useState } from 'react';
import styled from 'styled-components';

function PressCard() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const handleClick = () => {
    setIsSubscribed((prev) => !prev);
  };

  return (
    <Wrapper>
      <PressLogo src="#" />
      <PressInfo>
        <PressName>Channel Name</PressName>
        <PressSubInfo>
          <PressSubCount>구독자 1120명</PressSubCount>
          <PressSubBtn $isSubscribed={isSubscribed} onClick={handleClick}>
            {isSubscribed ? (
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
                  fill="#58D7A2"
                />
              </svg>
            )}
            {isSubscribed ? ' 구독중' : ' 구독'}
          </PressSubBtn>
        </PressSubInfo>
      </PressInfo>
    </Wrapper>
  );
}

export default PressCard;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 12px 0;
  gap: 12px;
  border-top: 0.2px solid ${({ theme }) => theme.relaxColor.superlight};
  border-bottom: 0.2px solid ${({ theme }) => theme.relaxColor.superlight};
`;

const PressLogo = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 999px;
`;

const PressInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const PressName = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 20px;
  font-weight: 600;
  height: 30px;
`;

const PressSubInfo = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
`;

const PressSubCount = styled.span`
  color: ${({ theme }) => theme.relaxColor.littlelight};
  font-size: 14px;
  height: 22px;
  line-height: 22px;
`;

const PressSubBtn = styled.button<{ $isSubscribed: boolean }>`
  height: 22px;
  background-color: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? theme.mainColor : theme.bgColor};
  border: 1px solid
    ${({ $isSubscribed, theme }) =>
      $isSubscribed ? theme.bgColor : theme.mainColor};
  color: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? theme.bgColor : theme.mainColor};

  font-size: 14px;
  line-height: 14px;
  border-radius: 12px;
  transition: 0.2s;
  padding: 0 5px;
`;
