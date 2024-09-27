import styled from 'styled-components';
import InputTitle from 'components/register/InputTitle';
import GenderBox from 'components/register/GenderBox';
import { GenderSelectBoxProps } from 'types/props/register';

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
