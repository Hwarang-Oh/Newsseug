import styled from 'styled-components';
import SubscribePressCard from 'components/subscribe/SubscribePressCard';
import { SubscribePressFilterProps } from '@/types/props/subscribe';

function SubscribePressFilter({
  subscribeData,
  activePress,
  setActivePress,
}: Readonly<SubscribePressFilterProps>) {
  const handleCardClick = (id: number) => {
    setActivePress(id === activePress ? null : id);
  };
  return (
    <Container>
      {subscribeData.map((press) => (
        <SubscribePressCard
          key={press.id}
          press={press}
          isActive={activePress === press.id}
          isAllActive={activePress === null}
          onClick={() => handleCardClick(press.id)}
        />
      ))}
    </Container>
  );
}

export default SubscribePressFilter;

const Container = styled.div`
  width: 100%;
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  padding-bottom: 12px;
  border-bottom: 1px solid #f4f4f4;

  align-items: flex-start;
  gap: 4px;
  flex-shrink: 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;
