import styled from 'styled-components';
import { NormalWordProps } from '@/types/splash';

function NormalWord({ text }: Readonly<NormalWordProps>) {
  return <StyledNormalWord>{text}</StyledNormalWord>;
}

export default NormalWord;

const StyledNormalWord = styled.p`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.7px;
`;
