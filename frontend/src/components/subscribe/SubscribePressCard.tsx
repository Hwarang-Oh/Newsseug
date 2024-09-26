import { SubscribePressCardProps } from '@/types/subscribe';
import styled from 'styled-components';
import {
  PressLogo,
  LogoContainer,
  PressName,
  PressContainer,
} from 'styles/subscribe-styles';

function SubscribePressCard({
  press,
  isActive,
  isAllActive,
  onClick,
}: SubscribePressCardProps) {
  return (
    <Container
      $isActive={isActive}
      $isAllActive={isAllActive}
      onClick={onClick}
    >
      <LogoContainer>
        <PressLogo src={press.imgUrl} />
      </LogoContainer>
      <PressName>{press.name}</PressName>
    </Container>
  );
}

export default SubscribePressCard;

const Container = styled(PressContainer)<{
  $isActive: boolean;
  $isAllActive: boolean;
}>`
  opacity: ${({ $isActive, $isAllActive }) =>
    $isActive || $isAllActive ? 1 : 0.5};
  background-color: ${({ $isActive, $isAllActive }) =>
    $isActive && !$isAllActive ? '#dfdfdf52' : 'transparent'};

  -webkit-transition:
    opacity 0.4s ease-in-out,
    background-color 0.4s ease-in-out;
  -moz-transition:
    opacity 0.4s ease-in-out,
    background-color 0.4s ease-in-out;
  -o-transition:
    opacity 0.4s ease-in-out,
    background-color 0.4s ease-in-out;
  transition:
    opacity 0.4s ease-in-out,
    background-color 0.4s ease-in-out;
`;
