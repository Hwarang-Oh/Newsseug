import styled from 'styled-components';
import { VectorWordProps } from '@/types/common/layout';

/**
 * IMP : VectorWord Component ( Icon + Text )
 * Type : icon, color?
 * @param param0
 * @returns
 */
function VectorWord({ icon, color = '#58D7A2' }: Readonly<VectorWordProps>) {
  return <StyledVectorWord color={color}>{icon}</StyledVectorWord>;
}

const StyledVectorWord = styled.div<{ color: string }>`
  svg {
    fill: ${({ color }) => color}; // SVG 내 모든 fill 속성에 color 적용
  }
`;

export default VectorWord;
