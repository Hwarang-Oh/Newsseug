import styled from 'styled-components';
import SubscribePressCard from 'components/subscribe/SubscribePressCard';
import { SubscribePressFilterProps } from '@/types/subscribe';
import { useState } from 'react';

function SubscribePressFilter({
  subscribeData,
}: Readonly<SubscribePressFilterProps>) {
  const [activePress, setActivePress] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setActivePress(idx === activePress ? null : idx);
  };
  return (
    <Container>
      {subscribeData.map((press, idx) => (
        <SubscribePressCard
          key={idx}
          imgUrl={press.imgUrl}
          pressName={press.pressName}
          isActive={activePress === idx}
          isAllActive={activePress === null}
          onClick={() => handleCardClick(idx)}
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
