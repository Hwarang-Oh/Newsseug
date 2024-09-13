import styled from 'styled-components';
import SubTitle from 'components/home/SubTitle';
import ArticleSlideBox from 'components/home/ArticleSlideBox';
import { SectionProps } from '@/types/home';

/**
 * IMP : Section Component ( Section )
 * Type : subTitle, articleList? ( Article List가 없을 수도 있기 때문에.. )
 * @param param0
 * @returns
 */
function Section({ subTitle, articleList }: Readonly<SectionProps>) {
  return (
    <SectionStyle>
      <SubTitle subTitle={subTitle} />
      <ArticleSlideBox articleList={articleList} />
    </SectionStyle>
  );
}

export default Section;

const SectionStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
