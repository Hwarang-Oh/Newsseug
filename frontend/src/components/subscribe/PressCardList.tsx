import styled from 'styled-components';
import PressCard from 'components/subscribe/PressCard';
import { PressCardListProp } from '@/types/props/subscribe';

function PressCardList({
  pressList,
  subscriptionStatus,
  toggleSubscribe,
  isAll,
}: PressCardListProp) {
  return (
    <Container $isAll={isAll}>
      {pressList.map((press) => (
        <PressCard
          key={press.id}
          press={press}
          isSubscribed={subscriptionStatus[press.id]}
          toggleSubscribe={toggleSubscribe}
        />
      ))}
    </Container>
  );
}

export default PressCardList;

const Container = styled.div<{ $isAll: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  align-content: center;
  margin-bottom: ${({ $isAll }) => $isAll && '70px'};
`;
