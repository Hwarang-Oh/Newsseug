import styled from 'styled-components';
import InputTitle from 'components/userInput/InputTitle';
import GenderBox from 'components/userInput/GenderBox';
import { GenderSelectBoxProps } from '@/types/userInput';

function GenderSelectBox({
  title,
  genderList,
  onSelect,
}: Readonly<GenderSelectBoxProps>) {
  return (
    <GenderSelectBoxStyle>
      <InputTitle title={title} />
      <GenderBoxListStyle>
        {genderList.map((genderBox, index) => (
          <GenderBox
            key={index}
            icon={genderBox.icon}
            selected={genderBox.selected}
            onClick={() => onSelect(index)}
          />
        ))}
      </GenderBoxListStyle>
    </GenderSelectBoxStyle>
  );
}

export default GenderSelectBox;

const GenderSelectBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 24px;
  gap: 8px;
`;

const GenderBoxListStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
