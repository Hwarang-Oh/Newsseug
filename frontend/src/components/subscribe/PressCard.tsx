import { PressCardProps } from 'types/subscribe';
import styled from 'styled-components';
import {
  PressLogo,
  LogoContainer,
  PressName,
  PressContainer,
} from 'styles/subscribe-styles';
import SubscribePlusIcon from 'assets/SubscribePlusIcon.svg';
import SubscribeMinusIcon from 'assets/SubscribeMinusIcon.svg';

function PressCard({ press, isSubscribed, toggleSubscribe }: PressCardProps) {
  return (
    <Container onClick={() => toggleSubscribe(press)}>
      <CustomLogoContainer $isSubscribed={isSubscribed}>
        <PressLogo src={press.imgUrl} />
        <SubscribeIcon>
          {isSubscribed ? (
            <img src={SubscribeMinusIcon} alt="plus icon" />
          ) : (
            <img src={SubscribePlusIcon} alt="plus icon" />
          )}
        </SubscribeIcon>
      </CustomLogoContainer>
      <PressName>{press.pressName}</PressName>
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
