import styled, { useTheme } from 'styled-components';
import { SubscribeHeaderProps } from 'types/props/subscribe';
import { useNavigate } from 'react-router-dom';

function SubscribeHeader({
  subscribeNumber,
  title,
  variant,
}: Readonly<SubscribeHeaderProps>) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleViewAllClick = () => {
    navigate('/subscribes/all');
  };

  return (
    <Container>
      <Title>
        {title}
        {subscribeNumber !== undefined && (
          <SubscribeCount>{subscribeNumber}</SubscribeCount>
        )}
      </Title>
      {variant === 'subscribed' && (
        <ViewAll onClick={handleViewAllClick}>
          <ViewAllText>구독 전체보기</ViewAllText>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.64645 1.14645C3.84171 0.951184 4.15829 0.951184 4.35355 1.14645L8.85355 5.64645C9.04882 5.84171 9.04882 6.15829 8.85355 6.35355L4.35355 10.8536C4.15829 11.0488 3.84171 11.0488 3.64645 10.8536C3.45118 10.6583 3.45118 10.3417 3.64645 10.1464L7.79289 6L3.64645 1.85355C3.45118 1.65829 3.45118 1.34171 3.64645 1.14645Z"
              fill={theme.relaxColor.dark}
            />
          </svg>
        </ViewAll>
      )}
    </Container>
  );
}

export default SubscribeHeader;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  align-items: center;
  align-self: stretch;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  padding: 0;
  color: ${({ theme }) => theme.textColor};
`;

const SubscribeCount = styled.span`
  color: ${({ theme }) => theme.mainColor};
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
`;

const ViewAll = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  svg {
    width: 12px;
    height: 12px;
  }
`;

const ViewAllText = styled.p`
  color: ${({ theme }) => theme.relaxColor.dark};
  font-size: 11px;
  font-weight: 500;
  line-height: 140%;
`;
