import styled from 'styled-components';
import { SubTitleProps } from '@/types/home';

/**
 * IMP : SubTitle Component ( SubTitle )
 * Type : subTitle
 * @param param0
 * @returns
 */
function SubTitle({ subTitle }: Readonly<SubTitleProps>) {
  return (
    <SubTitleBoxStyle>
      <SubTitleStyle>{subTitle}</SubTitleStyle>
    </SubTitleBoxStyle>
  );
}

export default SubTitle;

const SubTitleBoxStyle = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  flex-shrink: 0;
  gap: 50px
  align-self: stretch;
`;

const SubTitleStyle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.42px;
`;
