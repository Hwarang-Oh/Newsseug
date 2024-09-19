import styled from 'styled-components';
import { GenderBoxProps } from '@/types/userInput';

function GenderBox({ icon, selected, onClick }: Readonly<GenderBoxProps>) {
  return (
    <GenderBoxStyle $selected={selected} onClick={onClick}>
      {icon}
    </GenderBoxStyle>
  );
}
export default GenderBox;

const GenderBoxStyle = styled.div<{ $selected?: boolean }>`
  svg rect {
    fill: ${({ $selected }) => ($selected ? '#58D7A2' : '#F4F4F4')};
  }

  svg path {
    fill: ${({ $selected }) => ($selected ? '#FFFFFF' : '#202020')};
  }
`;
