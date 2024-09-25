import styled from 'styled-components';
import { ArticleListCardProps } from 'types/common/common';

/**
 * IMP : ArticleListCard ( News Card ) Component
 * TYPE : imgUrl, title, viewCount, pressName, width?, height?
 * @param param0
 * @returns
 */
function ArticleListCard({
  imgUrl,
  title,
  viewCount,
  pressName,
  width = '180px',
  height = '250px',
}: Readonly<ArticleListCardProps>) {
  return (
    <Wrapper width={width} height={height}>
      <Thumbnail src={imgUrl} />
      <PressTag width={width}>{pressName}</PressTag>
      <ArticleInfo>
        <ArticleTitle width={width}>{title}</ArticleTitle>
        <ViewCount width={width}>
          조회수 {formatViewCount(viewCount)}회
        </ViewCount>
      </ArticleInfo>
    </Wrapper>
  );
}

export default ArticleListCard;

const Wrapper = styled.div<{ width?: string; height?: string }>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: hidden;
  border-radius: 5px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비율을 유지하며 잘리는 부분을 감춤 */
  object-position: center; /* 중앙에 맞춰 자르기 */
`;

const ArticleInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  padding: 5px;
  bottom: 0px;
  left: 0px;
  gap: 2px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

const ArticleTitle = styled.h1<{ width: string }>`
  color: ${({ theme }) => theme.bgColor};
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: ${({ width }) =>
    width === '180px' || width === '100%' ? '15px' : '12px'};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;

  display: -webkit-box;
  -webkit-line-clamp: ${({ width }) =>
    width === '180px' || width === '100%' ? 2 : 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ViewCount = styled.p<{ width: string }>`
  color: ${({ theme }) => theme.bgColor};
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: ${({ width }) =>
    width === '180px' || width === '100%' ? '12px' : '10px'};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PressTag = styled.div<{ width: string }>`
  display: inline-flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  position: absolute;
  top: 5px;
  left: 5px;
  color: ${({ theme }) => theme.bgColor};
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: ${({ width }) =>
    width === '180px' || width === '100%' ? '12px' : '8px'};
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.2px;
`;

function formatViewCount(viewCount: number): string {
  if (viewCount >= 1000000000) {
    return (viewCount / 1000000000).toFixed(1) + 'B'; // billion 단위
  } else if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + 'M'; // million 단위
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + 'K'; // thousand 단위
  } else {
    return viewCount.toString(); // 천 이하일 경우 그대로 출력
  }
}
