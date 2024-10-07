import { PressCardProps } from 'types/props/subscribe';
import styled from 'styled-components';
import {
  PressLogo,
  LogoContainer,
  PressName,
  PressContainer,
} from 'styles/subscribe-styles';
import SubscribePlusIcon from 'assets/SubscribePlusIcon.svg';
import SubscribeMinusIcon from 'assets/SubscribeMinusIcon.svg';

function PressCard({
  press,
  isSubscribed,
  toggleSubscribe,
}: Readonly<PressCardProps>) {
  return (
    <Container onClick={() => toggleSubscribe(press)}>
      <CustomLogoContainer $isSubscribed={isSubscribed}>
        <PressLogo src={press.imageUrl} />
        <SubscribeIcon>
          {isSubscribed ? (
            <img src={SubscribeMinusIcon} alt="plus icon" />
          ) : (
            <img src={SubscribePlusIcon} alt="plus icon" />
          )}
        </SubscribeIcon>
      </CustomLogoContainer>
      <PressName>{press.name}</PressName>
    </Container>
  );
}

export default PressCard;

const Container = styled(PressContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 0;
`;

const CustomLogoContainer = styled(LogoContainer)<{
  $isSubscribed: boolean;
}>`
  position: relative;
  border: ${({ $isSubscribed, theme }) =>
    `${$isSubscribed ? '2px' : '1px'} solid ${$isSubscribed ? theme.mainColor : theme.relaxColor.superlight}`};
  background-color: ${({ theme }) => theme.bgColor};
`;

const SubscribeIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
