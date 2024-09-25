import styled from 'styled-components';
import PressProfile from './PressProfile';
import PressDescription from './PressDescription';
import { PressDetail } from 'types/api/press';

function PressInfo({
  name,
  imageUrl,
  pressId,
  description,
  subscribeCount,
}: Readonly<PressDetail>) {
  return (
    <Wrapper>
      <PressProfile
        name={name}
        imageUrl={imageUrl}
        subscribeCount={subscribeCount}
      />
      <PressDescription description={description} />
    </Wrapper>
  );
}

export default PressInfo;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 12px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
