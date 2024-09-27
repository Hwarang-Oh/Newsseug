import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubLayout from 'components/common/SubLayout';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { FolderDetail } from 'types/api/folder';
import { getFolderInfo } from 'apis/folderApi';
import { useParams } from 'react-router-dom';

function Folder() {
  const { folderId } = useParams();

  const {
    data: folderInfo,
    isLoading,
    error,
  } = useQuery<FolderDetail>(
    ['folderInfo', folderId],
    () => getFolderInfo(Number(folderId)),
    {
      enabled: !!folderId,
      onSuccess: () => {
        console.log('???', folderInfo);
      },
    },
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    return <div>언론사 정보 조회 실패: {errorMessage}</div>;
  }

  return (
    <SubLayout>
      <ScrapTitle>{folderInfo?.title}</ScrapTitle>
      <ArticleListCardGroup articleList={folderInfo?.articles || []} />
    </SubLayout>
  );
}

export default Folder;

const ScrapTitle = styled.span`
  max-width: 250px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
