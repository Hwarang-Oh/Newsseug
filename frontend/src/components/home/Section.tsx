import styled from 'styled-components';
import SubTitle from 'components/home/SubTitle';
import ArticleSlideBox from 'components/home/ArticleSlideBox';
import { SectionProps } from 'types/props/home';

/**
 * IMP : Section Component ( Section )
 * Type : subTitle, articleList? ( Article List가 없을 수도 있기 때문에.. )
 * @param param0
 * @returns
 */
function Section({
  subTitle,
  articleList,
  moreLink,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  sectionType,
  sliceDetails,
}: Readonly<SectionProps>) {
  return (
    <SectionStyle>
      <SubTitle subTitle={subTitle} moreLink={moreLink} />
      <ArticleSlideBox
        articleList={articleList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        sectionType={sectionType}
        sliceDetails={sliceDetails}
      />
    </SectionStyle>
  );
}

export default Section;

const SectionStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
