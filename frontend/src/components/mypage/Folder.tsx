import { FolderProps } from 'types/props/mypage';
import styled from 'styled-components';
import scrapIcon from 'assets/scrapIcon.svg';

function Folder({
  width = '180px',
  height = '250px',
  thumbnailUrl,
  folderTitle,
  folderCnt,
  onClick,
}: Readonly<FolderProps>) {
  return (
    <Wrapper width={width} height={height} url={thumbnailUrl} onClick={onClick}>
      <FolderTitle width={width}>{folderTitle}</FolderTitle>
      <FolderTag width={width}>
        <FolderTagIcon width={width} src={scrapIcon} />
        <FolderTagCnt width={width}>{folderCnt}</FolderTagCnt>
      </FolderTag>
    </Wrapper>
  );
}

export default Folder;

const Wrapper = styled.div<{ width?: string; height?: string; url: string }>`
  padding: 40px 10px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 8px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover; /* 이미지가 Wrapper에 맞게 꽉 채우되, 비율을 유지 */
  background-position: center; /* 이미지를 중앙에 맞춤 */
  background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    z-index: 1;
  }

  * {
    position: relative;
    z-index: 2;
  }
`;

const FolderTitle = styled.h1<{ width: string }>`
  color: #fff;
  font-size: ${({ width }) =>
    width === '180px' || width === '100%' ? '18px' : '14px'};
  width: ${({ width }) =>
    width === '180px' || width === '100%' ? '150px' : '90px'};
  text-align: center;
  margin: 0;
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  white-space: normal; /* 여러 줄로 표시 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 기호 추가 */
  display: -webkit-box; /* 여러 줄 텍스트에 클램프 적용 */
  -webkit-line-clamp: 5; /* 최대 2줄까지 표시 */
  -webkit-box-orient: vertical; /* 수직 방향 클램프 */
`;

const FolderTag = styled.div<{ width: string }>`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  gap: ${({ width }) =>
    width === '180px' || width === '100%' ? '3px' : '2px'};
  * {
    color: ${({ theme }) => theme.bgColor};
  }
`;

const FolderTagIcon = styled.img<{ width: string }>`
  width: ${({ width }) =>
    width === '180px' || width === '100%' ? '25px' : '20px'};
  height: ${({ width }) =>
    width === '180px' || width === '100%' ? '22px' : '20px'};
`;

const FolderTagCnt = styled.p<{ width: string }>`
  display: inline-block;
  line-height: ${({ width }) =>
    width === '180px' || width === '100%' ? '25px' : '20px'};
  width: ${({ width }) =>
    width === '180px' || width === '100%' ? '25px' : '20px'};
  height: ${({ width }) =>
    width === '180px' || width === '100%' ? '25px' : '20px'};
  font-size: ${({ width }) =>
    width === '180px' || width === '100%' ? '16px' : '14px'};
  font-family: 'Pretendard-Light' !important;
  color: #fff;
`;
