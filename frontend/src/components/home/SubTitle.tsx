import styled from 'styled-components';
import { SubTitleProps } from '@/types/home';

/**
 * IMP : SubTitle Component ( SubTitle )
 * Type : subTitle
 * @param param0
 * @returns
 */
function SubTitle({ subTitle, moreLink }: Readonly<SubTitleProps>) {
  return (
    <SubTitleBoxStyle>
      <SubTitleStyle>{subTitle}</SubTitleStyle>
      <MoreLinkStyle href={moreLink}>더보기</MoreLinkStyle>
    </SubTitleBoxStyle>
  );
}

export default SubTitle;

const SubTitleBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
`;

const SubTitleStyle = styled.p`
  color: #202020;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;

const MoreLinkStyle = styled.a`
  color: #58d7a2;
  text-decoration: none;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 14px */
  letter-spacing: -0.25px;
`;
