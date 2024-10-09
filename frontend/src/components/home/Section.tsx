import styled from 'styled-components';
import SubTitle from 'components/home/SubTitle';
import ArticleSlideBox from 'components/home/ArticleSlideBox';
import { SectionProps } from 'types/props/home';
import Spinner from '../common/Spinner';
import ErrorSection from '../common/ErrorSection';

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
  isLoading,
  sectionType,
  sliceDetails,
  isError,
}: Readonly<SectionProps>) {
  return (
    <SectionStyle>
      <SubTitle subTitle={subTitle} moreLink={moreLink} />
      {isError && (
        <ErrorSection
          height="250px"
          text={`${subTitle}를 불러오는 데 실패했어요...😥`}
        />
      )}
      {isLoading && <Spinner height="250px" />}
      {!isError && !isLoading && articleList.length > 0 ? (
        <ArticleSlideBox
          articleList={articleList}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          sectionType={sectionType}
          sliceDetails={sliceDetails}
        />
      ) : !isError && !isLoading && articleList.length === 0 ? (
        <ErrorSection height="250px" text={`${subTitle}가 없습니다.`} />
      ) : null}
    </SectionStyle>
  );
}

export default Section;

const SectionStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
